import TarjetaNoticia from "./TarjetaNoticia";
import { Noticia } from "../../../types/types";

type YearWithRows = {
	year: string;
	rows: Noticia[][];
};

type NewsContentDisplayProps = {
	yearsWithRows: YearWithRows[];
	abrirModal: (noticia: Noticia) => void;
};

const NewsContentDisplay: React.FC<NewsContentDisplayProps> = ({ yearsWithRows, abrirModal }) => {
	return (
		<div className="news-content-display">
			{yearsWithRows.map(({ year, rows }) => (
				<div key={year} className="year-section" data-year={year}>
					<div className="noticias-year-header">
						<div className="noticias-year-badge">
							<svg
								width="15"
								height="15"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								aria-hidden="true"
							>
								<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
								<line x1="16" y1="2" x2="16" y2="6" />
								<line x1="8" y1="2" x2="8" y2="6" />
								<line x1="3" y1="10" x2="21" y2="10" />
							</svg>
							<span>{year}</span>
						</div>
						<div className="noticias-year-line" aria-hidden="true" />
					</div>
					{rows.map((row, rowIndex) => (
						<div
							key={rowIndex}
							className="noticias-row grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6"
						>
							{row.map((noticia) => (
								<TarjetaNoticia
									key={noticia.id}
									noticia={noticia}
									onClick={() => abrirModal(noticia)}
								/>
							))}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default NewsContentDisplay;
