const canvas = document.querySelector('canvas');
const gl = canvas.getContext("webgl");

const vertexShaderSource = `
    attribute vec3 a_position;
    uniform mat4 u_matrix;

    void main() {
        gl_Position = u_matrix * vec4(a_position, 1.0);
    }
`;

const fragmentShaderSource = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

const program = createProgram(gl, vertexShader, fragmentShader);
const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

const positions = [];
const numSegments = 30;
const radius = 0.5;

for (let i = 0; i <= numSegments; i++) {
    const theta = (i / numSegments) * Math.PI * 2;
    const x = Math.cos(theta) * radius;
    const y = Math.sin(theta) * radius;
    positions.push(x, y, 0);
}

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

const translation = [0, 0, 0];
const matrix = m4.translation(translation);
const positionAttributeSize = 3;
const positionAttributeType = gl.FLOAT;
const normalize = false;
const stride = 0;
const offset = 0;

gl.useProgram(program);
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, positionAttributeSize, positionAttributeType, normalize, stride, offset);
gl.uniformMatrix4fv(gl.getUniformLocation(program, "u_matrix"), false, matrix);
gl.drawArrays(gl.LINE_LOOP, 0, positions.length / positionAttributeSize);

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
        return null;
    }
    return program;
}
