export function getFileExtension(url: string): string {
    // Intentamos extraer la extensión directamente del nombre del archivo
    const match = url.match(/\/([^/]+)\.([a-zA-Z0-9]+)$/);

    if (match && match[2]) {
        return match[2]; // Retorna la extensión extraída
    }

    // Si no se encuentra, retorna un valor predeterminado o lanza un error
    return 'unknown';
}