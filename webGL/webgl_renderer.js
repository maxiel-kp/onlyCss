window.addEventListener('DOMContentLoaded', () => {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    document.documentElement.appendChild(canvas); // Append it to the root of the document

    // Set canvas to cover the entire viewport
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '-1'; // Move the canvas behind other content

    // Get WebGL context
    const gl = canvas.getContext("webgl");
    if (!gl) {
        console.error("Unable to initialize WebGL. Your browser may not support it.");
        return;
    }

    // Set canvas resolution to match display resolution
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // WebGL initialization code
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.8, 0.8, 0.8, 1); // Light gray background
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Your WebGL rendering code here
});
