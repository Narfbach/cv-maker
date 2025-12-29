# CV Maker

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![No Dependencies](https://img.shields.io/badge/dependencies-0-green)
![Bundle Size](https://img.shields.io/badge/bundle%20size-38KB-brightgreen)

A modern, professional CV generator with real-time preview and extensive customization options. Built with vanilla JavaScript, HTML5, and CSS3, featuring a cassette futurism-inspired interface design.

## Features

### Core Functionality
- **Real-time Preview**: Instant visualization of CV changes as you type
- **Print-Ready Output**: Optimized PDF generation via browser print functionality
- **Responsive Design**: Fully functional across desktop and mobile devices
- **No Dependencies**: Pure vanilla JavaScript implementation with zero external libraries

### Customization Options
- **Dynamic Styling Controls**: Adjust font sizes, colors, and spacing in real-time
- **Flexible Sections**: Add/remove multiple entries for experience, education, and skills
- **Contact Information**: Support for email, phone, location, GitHub, LinkedIn, and portfolio links
- **Theme Personalization**: Custom color schemes for accent, text, and headings

### Professional Output
- **Clean Typography**: Optimized for readability and professional presentation
- **Structured Layout**: Well-organized sections following industry-standard CV formats
- **Clickable Links**: Interactive contact information in the generated CV
- **Print Optimization**: CSS-optimized for high-quality PDF exports

## Technology Stack

- **HTML5**: Semantic markup with accessibility considerations
- **CSS3**: Modern styling with CSS custom properties for theming
- **JavaScript (ES6+)**: Vanilla implementation with modular architecture
- **No Build Process**: Direct browser execution without compilation

## Project Structure

```
generador-de-cv/
├── index.html          # Main application structure
├── styles.css          # Complete styling system
├── script.js           # Application logic and state management
├── LICENSE             # MIT License
└── README.md           # Project documentation
```

## Installation & Usage

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/Narfbach/generador-de-cv.git
cd generador-de-cv
```

2. Open `index.html` in your browser:
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

Alternatively, use a local development server:
```bash
# Python 3
python -m http.server 8000

# Node.js (with http-server)
npx http-server -p 8000
```

Then navigate to `http://localhost:8000`

### Deployment

The application is fully static and can be deployed to any web hosting service:

- **GitHub Pages**: Push to `gh-pages` branch
- **Netlify**: Drag and drop the project folder
- **Vercel**: Import from GitHub repository
- **Any static host**: Upload all files to web root

## Usage Guide

### Creating Your CV

1. **Personal Information**: Fill in your name, professional title, and contact details
2. **Profile Summary**: Write a brief professional description
3. **Experience**: Add work history with positions, companies, periods, and descriptions
4. **Education**: Include academic qualifications and institutions
5. **Skills**: List relevant technical and professional skills

### Customization

Access the "Personalización de Estilos" section to adjust:
- Name font size (1.5rem - 4rem)
- Title font size (0.8rem - 2rem)
- Text font size (0.7rem - 1.5rem)
- Accent color
- Name color
- Text color

### Exporting to PDF

Click "Imprimir / Guardar como PDF" and use your browser's print dialog:
1. Select "Save as PDF" as the destination
2. Ensure "Background graphics" is enabled
3. Set margins to "None" or "Minimum"
4. Click "Save"

## Architecture

### State Management
The application uses a centralized `cvData` object to manage all CV information. Changes trigger reactive updates to the preview section.

### Rendering Pipeline
1. User input triggers event listeners
2. State object updates
3. `renderPreview()` regenerates CV HTML
4. DOM updates reflect changes instantly

### Styling System
CSS custom properties enable dynamic theming:
```css
--cv-name-size
--cv-title-size
--cv-text-size
--cv-accent-color
--cv-name-color
--cv-text-color
```

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Performance

- **Initial Load**: < 50ms (no external dependencies)
- **Render Time**: < 10ms per update
- **Bundle Size**: ~38KB total (uncompressed)

## Security

- No external API calls
- No data transmission
- All processing happens client-side
- No cookies or tracking

## Contributing

Contributions are welcome. Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/improvement`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Francisco**
- GitHub: [@Narfbach](https://github.com/Narfbach)
- Location: Argentina

## Acknowledgments

Design inspired by cassette futurism aesthetics and modern web application patterns.
