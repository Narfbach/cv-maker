// Estado global del CV
let cvData = {
    nombre: 'Tu Nombre Completo',
    titulo: 'Tu Título Profesional',
    email: 'tu@email.com',
    telefono: '+54 9 11 1234-5678',
    ubicacion: 'Ciudad, Argentina',
    github: '',
    linkedin: '',
    portfolio: '',
    resumen: 'Breve descripción profesional que destaque tus fortalezas y objetivos.',
    experiencia: [
        {
            puesto: 'Puesto',
            empresa: 'Empresa',
            periodo: '2022 - Presente',
            descripcion: 'Logros y responsabilidades principales'
        }
    ],
    educacion: [
        {
            titulo: 'Título',
            institucion: 'Institución',
            periodo: '2018 - 2022'
        }
    ],
    habilidades: ['Habilidad 1', 'Habilidad 2', 'Habilidad 3']
};

let showPreview = true;
let saveTimeout = null;

// Constantes para localStorage
const STORAGE_KEY = 'cvMakerData';
const STORAGE_STYLES_KEY = 'cvMakerStyles';

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadFromStorage();
    initializeInputs();
    renderExperiencia();
    renderEducacion();
    renderHabilidades();
    renderPreview();
    setupEventListeners();
    createSaveIndicator();
});

// Configurar event listeners
function setupEventListeners() {
    // Inputs de información personal
    ['nombre', 'titulo', 'email', 'telefono', 'ubicacion', 'github', 'linkedin', 'portfolio', 'resumen'].forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            element.addEventListener('input', (e) => {
                cvData[field] = e.target.value;
                renderPreview();
                saveToStorage();
            });
        }
    });

    // Style controls
    setupStyleControls();
}

// Configurar controles de personalización
function setupStyleControls() {
    const nameSize = document.getElementById('nameSize');
    const titleSize = document.getElementById('titleSize');
    const textSize = document.getElementById('textSize');
    const accentColor = document.getElementById('accentColor');
    const nameColor = document.getElementById('nameColor');
    const textColor = document.getElementById('textColor');

    nameSize.addEventListener('input', (e) => {
        const value = e.target.value + 'rem';
        document.documentElement.style.setProperty('--cv-name-size', value);
        document.getElementById('nameSizeValue').textContent = value;
        saveStylesToStorage();
    });

    titleSize.addEventListener('input', (e) => {
        const value = e.target.value + 'rem';
        document.documentElement.style.setProperty('--cv-title-size', value);
        document.documentElement.style.setProperty('--cv-section-title-size', value);
        document.getElementById('titleSizeValue').textContent = value;
        saveStylesToStorage();
    });

    textSize.addEventListener('input', (e) => {
        const value = e.target.value + 'rem';
        document.documentElement.style.setProperty('--cv-text-size', value);
        const contactSize = (parseFloat(e.target.value) * 0.875) + 'rem';
        document.documentElement.style.setProperty('--cv-contact-size', contactSize);
        document.getElementById('textSizeValue').textContent = value;
        saveStylesToStorage();
    });

    accentColor.addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--cv-accent-color', e.target.value);
        document.documentElement.style.setProperty('--cv-title-color', e.target.value);
        saveStylesToStorage();
    });

    nameColor.addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--cv-name-color', e.target.value);
        document.documentElement.style.setProperty('--cv-section-color', e.target.value);
        saveStylesToStorage();
    });

    textColor.addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--cv-text-color', e.target.value);
        saveStylesToStorage();
    });
}

// ============================================
// SISTEMA DE PERSISTENCIA CON LOCALSTORAGE
// ============================================

// Crear indicador de guardado
function createSaveIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'saveIndicator';
    indicator.className = 'save-indicator';
    indicator.innerHTML = `
        <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>Guardado automáticamente</span>
    `;
    document.body.appendChild(indicator);
}

// Mostrar indicador de guardado
function showSaveIndicator() {
    const indicator = document.getElementById('saveIndicator');
    if (indicator) {
        indicator.classList.add('show');
        setTimeout(() => {
            indicator.classList.remove('show');
        }, 2000);
    }
}

// Guardar datos en localStorage con debounce
function saveToStorage() {
    // Cancelar guardado anterior si existe
    if (saveTimeout) {
        clearTimeout(saveTimeout);
    }

    // Guardar después de 500ms de inactividad
    saveTimeout = setTimeout(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
            showSaveIndicator();
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
        }
    }, 500);
}

// Guardar estilos en localStorage
function saveStylesToStorage() {
    try {
        const styles = {
            nameSize: document.getElementById('nameSize').value,
            titleSize: document.getElementById('titleSize').value,
            textSize: document.getElementById('textSize').value,
            accentColor: document.getElementById('accentColor').value,
            nameColor: document.getElementById('nameColor').value,
            textColor: document.getElementById('textColor').value
        };
        localStorage.setItem(STORAGE_STYLES_KEY, JSON.stringify(styles));
        showSaveIndicator();
    } catch (error) {
        console.error('Error al guardar estilos:', error);
    }
}

// Cargar datos desde localStorage
function loadFromStorage() {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            cvData = JSON.parse(savedData);
        }

        const savedStyles = localStorage.getItem(STORAGE_STYLES_KEY);
        if (savedStyles) {
            const styles = JSON.parse(savedStyles);

            // Aplicar estilos guardados
            document.documentElement.style.setProperty('--cv-name-size', styles.nameSize + 'rem');
            document.documentElement.style.setProperty('--cv-title-size', styles.titleSize + 'rem');
            document.documentElement.style.setProperty('--cv-section-title-size', styles.titleSize + 'rem');
            document.documentElement.style.setProperty('--cv-text-size', styles.textSize + 'rem');

            const contactSize = (parseFloat(styles.textSize) * 0.875) + 'rem';
            document.documentElement.style.setProperty('--cv-contact-size', contactSize);

            document.documentElement.style.setProperty('--cv-accent-color', styles.accentColor);
            document.documentElement.style.setProperty('--cv-title-color', styles.accentColor);
            document.documentElement.style.setProperty('--cv-name-color', styles.nameColor);
            document.documentElement.style.setProperty('--cv-section-color', styles.nameColor);
            document.documentElement.style.setProperty('--cv-text-color', styles.textColor);

            // Actualizar valores de los controles
            setTimeout(() => {
                document.getElementById('nameSize').value = styles.nameSize;
                document.getElementById('titleSize').value = styles.titleSize;
                document.getElementById('textSize').value = styles.textSize;
                document.getElementById('accentColor').value = styles.accentColor;
                document.getElementById('nameColor').value = styles.nameColor;
                document.getElementById('textColor').value = styles.textColor;

                document.getElementById('nameSizeValue').textContent = styles.nameSize + 'rem';
                document.getElementById('titleSizeValue').textContent = styles.titleSize + 'rem';
                document.getElementById('textSizeValue').textContent = styles.textSize + 'rem';
            }, 0);
        }
    } catch (error) {
        console.error('Error al cargar desde localStorage:', error);
    }
}

// Limpiar datos guardados
function clearStorage() {
    if (confirm('¿Estás seguro de que quieres borrar todos los datos guardados?')) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_STYLES_KEY);
        location.reload();
    }
}

// ============================================
// FIN SISTEMA DE PERSISTENCIA
// ============================================


// Restaurar estilos por defecto
function resetStyles() {
    document.documentElement.style.setProperty('--cv-name-size', '2.5rem');
    document.documentElement.style.setProperty('--cv-title-size', '1.25rem');
    document.documentElement.style.setProperty('--cv-section-title-size', '1.25rem');
    document.documentElement.style.setProperty('--cv-text-size', '1rem');
    document.documentElement.style.setProperty('--cv-contact-size', '0.875rem');
    document.documentElement.style.setProperty('--cv-name-color', '#111827');
    document.documentElement.style.setProperty('--cv-title-color', '#2563eb');
    document.documentElement.style.setProperty('--cv-section-color', '#111827');
    document.documentElement.style.setProperty('--cv-text-color', '#374151');
    document.documentElement.style.setProperty('--cv-accent-color', '#2563eb');

    document.getElementById('nameSize').value = 2.5;
    document.getElementById('titleSize').value = 1.25;
    document.getElementById('textSize').value = 1;
    document.getElementById('accentColor').value = '#2563eb';
    document.getElementById('nameColor').value = '#111827';
    document.getElementById('textColor').value = '#374151';

    document.getElementById('nameSizeValue').textContent = '2.5rem';
    document.getElementById('titleSizeValue').textContent = '1.25rem';
    document.getElementById('textSizeValue').textContent = '1rem';
}

// Inicializar valores de inputs
function initializeInputs() {
    document.getElementById('nombre').value = cvData.nombre;
    document.getElementById('titulo').value = cvData.titulo;
    document.getElementById('email').value = cvData.email;
    document.getElementById('telefono').value = cvData.telefono;
    document.getElementById('ubicacion').value = cvData.ubicacion;
    document.getElementById('github').value = cvData.github;
    document.getElementById('linkedin').value = cvData.linkedin;
    document.getElementById('portfolio').value = cvData.portfolio;
    document.getElementById('resumen').value = cvData.resumen;
}

// Renderizar experiencia
function renderExperiencia() {
    const container = document.getElementById('experienciaList');
    container.innerHTML = cvData.experiencia.map((exp, index) => `
        <div class="exp-item">
            <input type="text" class="input" placeholder="Puesto" value="${exp.puesto}" 
                   onchange="updateExperiencia(${index}, 'puesto', this.value)">
            <input type="text" class="input" placeholder="Empresa" value="${exp.empresa}"
                   onchange="updateExperiencia(${index}, 'empresa', this.value)">
            <input type="text" class="input" placeholder="Período" value="${exp.periodo}"
                   onchange="updateExperiencia(${index}, 'periodo', this.value)">
            <textarea class="textarea" placeholder="Logros y responsabilidades" 
                      onchange="updateExperiencia(${index}, 'descripcion', this.value)">${exp.descripcion}</textarea>
            <button class="btn-danger" onclick="removeExperiencia(${index})">
                <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Eliminar
            </button>
        </div>
    `).join('');
}

function updateExperiencia(index, field, value) {
    cvData.experiencia[index][field] = value;
    renderPreview();
    saveToStorage();
}

function addExperiencia() {
    cvData.experiencia.push({
        puesto: 'Nuevo Puesto',
        empresa: 'Empresa',
        periodo: '2023 - Presente',
        descripcion: 'Descripción'
    });
    renderExperiencia();
    renderPreview();
    saveToStorage();
}

function removeExperiencia(index) {
    cvData.experiencia.splice(index, 1);
    renderExperiencia();
    renderPreview();
    saveToStorage();
}

// Renderizar educación
function renderEducacion() {
    const container = document.getElementById('educacionList');
    container.innerHTML = cvData.educacion.map((edu, index) => `
        <div class="edu-item">
            <input type="text" class="input" placeholder="Título" value="${edu.titulo}"
                   onchange="updateEducacion(${index}, 'titulo', this.value)">
            <input type="text" class="input" placeholder="Institución" value="${edu.institucion}"
                   onchange="updateEducacion(${index}, 'institucion', this.value)">
            <input type="text" class="input" placeholder="Período" value="${edu.periodo}"
                   onchange="updateEducacion(${index}, 'periodo', this.value)">
            <button class="btn-danger" onclick="removeEducacion(${index})">
                <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Eliminar
            </button>
        </div>
    `).join('');
}

function updateEducacion(index, field, value) {
    cvData.educacion[index][field] = value;
    renderPreview();
    saveToStorage();
}

function addEducacion() {
    cvData.educacion.push({
        titulo: 'Título',
        institucion: 'Institución',
        periodo: '2020 - 2024'
    });
    renderEducacion();
    renderPreview();
    saveToStorage();
}

function removeEducacion(index) {
    cvData.educacion.splice(index, 1);
    renderEducacion();
    renderPreview();
    saveToStorage();
}

// Renderizar habilidades
function renderHabilidades() {
    const container = document.getElementById('habilidadesList');
    container.innerHTML = cvData.habilidades.map((hab, index) => `
        <div class="hab-item">
            <input type="text" class="input" placeholder="Habilidad" value="${hab}"
                   onchange="updateHabilidad(${index}, this.value)">
            <button class="btn-danger" onclick="removeHabilidad(${index})">
                <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            </button>
        </div>
    `).join('');
}

function updateHabilidad(index, value) {
    cvData.habilidades[index] = value;
    renderPreview();
    saveToStorage();
}

function addHabilidad() {
    cvData.habilidades.push('Nueva habilidad');
    renderHabilidades();
    renderPreview();
    saveToStorage();
}

function removeHabilidad(index) {
    cvData.habilidades.splice(index, 1);
    renderHabilidades();
    renderPreview();
    saveToStorage();
}

// Renderizar vista previa
function renderPreview() {
    const preview = document.getElementById('cvPreview');

    // Crear links clickeables
    const emailLink = cvData.email ? `<a href="mailto:${cvData.email}">${cvData.email}</a>` : '';
    const phoneLink = cvData.telefono ? `<a href="tel:${cvData.telefono.replace(/\s/g, '')}">${cvData.telefono}</a>` : '';
    const locationLink = cvData.ubicacion ? `<a href="https://www.google.com/maps/search/${encodeURIComponent(cvData.ubicacion)}" target="_blank">${cvData.ubicacion}</a>` : '';
    const githubLink = cvData.github ? `<a href="https://${cvData.github.replace(/^https?:\/\//, '')}" target="_blank">${cvData.github}</a>` : '';
    const linkedinLink = cvData.linkedin ? `<a href="https://${cvData.linkedin.replace(/^https?:\/\//, '')}" target="_blank">${cvData.linkedin}</a>` : '';
    const portfolioLink = cvData.portfolio ? `<a href="https://${cvData.portfolio.replace(/^https?:\/\//, '')}" target="_blank">${cvData.portfolio}</a>` : '';

    const contactItems = [];

    if (cvData.email) {
        contactItems.push({
            icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
            text: emailLink
        });
    }

    if (cvData.telefono) {
        contactItems.push({
            icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
            text: phoneLink
        });
    }

    if (cvData.ubicacion) {
        contactItems.push({
            icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
            text: locationLink
        });
    }

    if (cvData.github) {
        contactItems.push({
            icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
            text: githubLink
        });
    }

    if (cvData.linkedin) {
        contactItems.push({
            icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
            text: linkedinLink
        });
    }

    if (cvData.portfolio) {
        contactItems.push({
            icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
            text: portfolioLink
        });
    }

    preview.innerHTML = `
        <div class="cv-header">
            <h1 class="cv-name">${cvData.nombre}</h1>
            <p class="cv-title">${cvData.titulo}</p>
            <div class="cv-contact">
                ${contactItems.map(item => `
                    <div class="cv-contact-item">
                        <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="${item.icon}"></path>
                        </svg>
                        ${item.text}
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="cv-section">
            <h2 class="cv-section-title">PERFIL</h2>
            <p class="cv-text">${cvData.resumen}</p>
        </div>

        <div class="cv-section">
            <h2 class="cv-section-title">EXPERIENCIA LABORAL</h2>
            ${cvData.experiencia.map(exp => `
                <div class="cv-exp-item">
                    <h3 class="cv-exp-title">${exp.puesto}</h3>
                    <p class="cv-exp-company">${exp.empresa}</p>
                    <p class="cv-period">${exp.periodo}</p>
                    <p class="cv-text">${exp.descripcion}</p>
                </div>
            `).join('')}
        </div>

        <div class="cv-section">
            <h2 class="cv-section-title">EDUCACIÓN</h2>
            ${cvData.educacion.map(edu => `
                <div class="cv-edu-item">
                    <h3 class="cv-edu-title">${edu.titulo}</h3>
                    <p class="cv-edu-institution">${edu.institucion}</p>
                    <p class="cv-period">${edu.periodo}</p>
                </div>
            `).join('')}
        </div>

        <div class="cv-section">
            <h2 class="cv-section-title">HABILIDADES</h2>
            <div class="cv-skills">
                ${cvData.habilidades.map(hab => `
                    <span class="cv-skill-tag">${hab}</span>
                `).join('')}
            </div>
        </div>
    `;
}


// Imprimir CV
function printCV() {
    window.print();
}
