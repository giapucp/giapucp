// components/RichTextRenderer.tsx
/* eslint-disable */
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import Image from 'next/image';

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: any) => <strong>{text}</strong>,
    [MARKS.ITALIC]: (text: any) => <em>{text}</em>,
    [MARKS.UNDERLINE]: (text: any) => <u>{text}</u>,
    [MARKS.CODE]: (text: any) => <code>{text}</code>,
  },
  renderNode: {
    [BLOCKS.HEADING_1]: (node: any, children: any) => <h1 className="text-2xl font-bold my-4">{children}</h1>,
    [BLOCKS.HEADING_2]: (node: any, children: any) => <h2 className="text-xl font-bold my-3">{children}</h2>,
    [BLOCKS.HEADING_3]: (node: any, children: any) => <h3 className="text-lg font-bold my-2">{children}</h3>,
    [BLOCKS.HEADING_4]: (node: any, children: any) => <h4 className="text-base font-bold my-2">{children}</h4>,
    [BLOCKS.HEADING_5]: (node: any, children: any) => <h5 className="text-sm font-bold my-1">{children}</h5>,
    [BLOCKS.HEADING_6]: (node: any, children: any) => <h6 className="text-xs font-bold my-1">{children}</h6>,
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => <p className="my-3 leading-relaxed">{children}</p>,
    [BLOCKS.UL_LIST]: (node: any, children: any) => <ul className="list-disc list-inside my-4">{children}</ul>,
    [BLOCKS.OL_LIST]: (node: any, children: any) => <ol className="list-decimal list-inside my-4">{children}</ol>,
    [BLOCKS.LIST_ITEM]: (node: any, children: any) => <li className="mb-1">{children}</li>,
    [BLOCKS.QUOTE]: (node: any, children: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic">{children}</blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-6 border-gray-300" />,
    
    [INLINES.HYPERLINK]: (node: any, children: any) => (
      <a href={node.data.uri} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { file, title, description } = node.data.target.fields;
      const imageUrl = `https:${file.url}`;
      return (
        <div className="my-6">
          <Image
            src={imageUrl}
            alt={title || description || 'Embedded asset'}
            width={800}
            height={400}
            className="rounded-lg mx-auto"
          />
          {title && <p className="text-center text-sm text-gray-600 mt-2">{title}</p>}
        </div>
      );
    },
  },
};

interface RichTextRendererProps {
  content: any;
}

export const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content }) => {
  if (!content) return null;

  try {
    // Si el contenido es un string, renderízalo como texto simple
    if (typeof content === 'string') {
      return <div className="rich-text-content">{content}</div>;
    }

    // Si es un objeto RichText de Contentful
    if (content.nodeType === 'document' && content.content) {
      return <div className="rich-text-content">{documentToReactComponents(content, options)}</div>;
    }

    // Si no es un formato reconocido, muestra un mensaje de error
    console.warn('Formato de contenido no reconocido:', content);
    return <p>No se puede mostrar el contenido</p>;
    
  } catch (error) {
    console.error('Error rendering rich text:', error);
    return <p>Error al cargar el contenido</p>;
  }
};