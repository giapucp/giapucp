// components/RichTextRenderer.tsx
/* eslint-disable */
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import Image from 'next/image';
import { useEffect } from 'react';

// Componente para Instagram Embeds
const InstagramEmbed = ({ url }: { url: string }) => {
  useEffect(() => {
    // Cargar el script de Instagram embed
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    } else {
      const script = document.createElement('script');
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="my-6 flex justify-center">
      <blockquote 
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: '0',
          borderRadius: '3px',
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
          margin: '1px',
          maxWidth: '540px',
          minWidth: '326px',
          padding: '0',
          width: '99.375%'
        }}
      >
        <div style={{ padding: '16px' }}>
          <a
            href={url}
            style={{
              background: '#FFFFFF',
              lineHeight: '0',
              padding: '0 0',
              textAlign: 'center',
              textDecoration: 'none',
              width: '100%'
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Cargando publicación de Instagram...
          </a>
        </div>
      </blockquote>
    </div>
  );
};

// Componente para enlaces mejorados
const EnhancedLink = ({ node, children }: { node: any; children: any }) => {
  const url = node.data.uri;
  
  // Detectar si es un enlace de Instagram
  const isInstagram = 
    url.includes('instagram.com/p/') || 
    url.includes('instagram.com/reel/') || 
    url.includes('instagram.com/tv/') ||
    url.includes('instagram.com/stories/') ||
    (url.includes('instagram.com/') && !url.includes('instagram.com/embed'));
  
  if (isInstagram) {
    // Extraer el permalink limpio
    const cleanUrl = url.split('?')[0]; // Remover parámetros URL
    return <InstagramEmbed url={cleanUrl} />;
  }
  
  // Detectar otros tipos de enlaces para mejor formato
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return (
      <a 
        href={url} 
        className="text-red-600 hover:underline font-medium" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        🎥 {children}
      </a>
    );
  }
  
  if (url.includes('twitter.com') || url.includes('x.com')) {
    return (
      <a 
        href={url} 
        className="text-blue-400 hover:underline font-medium" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        🐦 {children}
      </a>
    );
  }
  
  // Enlace normal
  return (
    <a href={url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: any) => <strong className="font-bold">{text}</strong>,
    [MARKS.ITALIC]: (text: any) => <em className="italic">{text}</em>,
    [MARKS.UNDERLINE]: (text: any) => <u className="underline">{text}</u>,
    [MARKS.CODE]: (text: any) => (
      <code className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm">
        {text}
      </code>
    ),
  },
  renderNode: {
    [BLOCKS.HEADING_1]: (node: any, children: any) => (
      <h1 className="text-3xl font-bold my-6 text-gray-900">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: any) => (
      <h2 className="text-2xl font-bold my-5 text-gray-800">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: any) => (
      <h3 className="text-xl font-bold my-4 text-gray-700">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (node: any, children: any) => (
      <h4 className="text-lg font-bold my-3 text-gray-700">{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (node: any, children: any) => (
      <h5 className="text-base font-bold my-2 text-gray-700">{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (node: any, children: any) => (
      <h6 className="text-sm font-bold my-2 text-gray-600 uppercase tracking-wide">{children}</h6>
    ),
    
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
      // Si el párrafo está vacío, no renderizar nada
      if (!children || (Array.isArray(children) && children.every(child => child === null || child === ''))) {
        return null;
      }
      return <p className="my-4 leading-relaxed text-gray-700">{children}</p>;
    },
    
    [BLOCKS.UL_LIST]: (node: any, children: any) => (
      <ul className="list-disc list-inside my-6 space-y-2">{children}</ul>
    ),
    
    [BLOCKS.OL_LIST]: (node: any, children: any) => (
      <ol className="list-decimal list-inside my-6 space-y-2">{children}</ol>
    ),
    
    [BLOCKS.LIST_ITEM]: (node: any, children: any) => {
      // Manejar listas anidadas
      const hasList = node.content.some((item: any) => 
        item.content?.some((content: any) => 
          content.nodeType === BLOCKS.UL_LIST || content.nodeType === BLOCKS.OL_LIST
        )
      );
      
      return (
        <li className={`mb-2 ${hasList ? 'list-none' : ''}`}>
          {children}
        </li>
      );
    },
    
    [BLOCKS.QUOTE]: (node: any, children: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 my-6 italic text-gray-600 bg-blue-50 py-4 rounded-r">
        {children}
      </blockquote>
    ),
    
    [BLOCKS.HR]: () => (
      <hr className="my-8 border-gray-300 border-t-2" />
    ),
    
    [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
      // Manejar entries embebidos (podrías expandir esto según tus content types)
      const { __typename } = node.data.target.sys.contentType.sys;
      
      return (
        <div className="my-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <p className="text-sm text-gray-500">
            Embedded entry: {__typename}
          </p>
          <p className="text-xs text-gray-400">
            (Configura el renderizado para este tipo de contenido)
          </p>
        </div>
      );
    },
    
    [INLINES.HYPERLINK]: (node: any, children: any) => (
      <EnhancedLink node={node} children={children} />
    ),
    
    [INLINES.EMBEDDED_ENTRY]: (node: any) => {
      // Para entries embebidos en línea
      return (
        <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">
          [Embedded Content]
        </span>
      );
    },
    
    [INLINES.ENTRY_HYPERLINK]: (node: any, children: any) => (
      <a 
        href={`/entry/${node.data.target.sys.id}`}
        className="text-green-600 hover:underline font-medium"
      >
        {children}
      </a>
    ),
    
    [INLINES.ASSET_HYPERLINK]: (node: any, children: any) => (
      <a 
        href={node.data.target.fields.file.url}
        className="text-purple-600 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { file, title, description } = node.data.target.fields;
      
      if (!file) return null;
      
      const imageUrl = `https:${file.url}`;
      const isImage = file.contentType.includes('image');
      
      if (isImage) {
        return (
          <div className="my-8">
            <div className="flex justify-center">
              <Image
                src={imageUrl}
                alt={title || description || 'Embedded asset'}
                width={800}
                height={600}
                className="rounded-lg max-w-full h-auto"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            {title && (
              <p className="text-center text-sm text-gray-600 mt-3 italic">
                {title}
              </p>
            )}
          </div>
        );
      }
      
      // Para otros tipos de archivos (PDF, etc.)
      return (
        <div className="my-6 p-4 border border-gray-300 rounded-lg bg-white">
          <a 
            href={imageUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <span className="mr-2">📎</span>
            {title || 'Descargar archivo'}
          </a>
        </div>
      );
    },
  },
};

interface RichTextRendererProps {
  content: any;
  className?: string;
}

export const RichTextRenderer: React.FC<RichTextRendererProps> = ({ 
  content, 
  className = '' 
}) => {
  if (!content) return null;

  try {
    // Si el contenido es un string, renderízalo como texto simple
    if (typeof content === 'string') {
      return (
        <div className={`rich-text-content prose prose-gray max-w-none ${className}`}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      );
    }

    // Si es un objeto RichText de Contentful
    if (content.nodeType === 'document' && content.content) {
      return (
        <div className={`rich-text-content prose prose-gray max-w-none ${className}`}>
          {documentToReactComponents(content, options)}
        </div>
      );
    }

    // Si no es un formato reconocido, muestra un mensaje de error
    console.warn('Formato de contenido no reconocido:', content);
    return <p className="text-red-500">No se puede mostrar el contenido</p>;
    
  } catch (error) {
    console.error('Error rendering rich text:', error);
    return <p className="text-red-500">Error al cargar el contenido</p>;
  }
};

export default RichTextRenderer;