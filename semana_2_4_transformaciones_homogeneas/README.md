# Transformaciones Homogéneas y Cambios de Base

## Nombres de los Estudiantes

* Alejandro Ortiz Cortes
* John Alejandro Pastor Sandoval
* Nicolas Quezada Mora
* Baruj Vladimir Escalante Ramirez
* Joan Sebastian Puerto Roberto
* Nicolas Rodriguez Piraban

Fecha de entrega: 27/02/2026

Descripción breve: El taller va dirigido a las aplicaciones de las transformaciones homogéneas en 2D y 3D, asi como la composición de transformaciones y realizar cambios de base entre sistemas de referencia. Para esto se realizaron 3 implementaciones en Python, Unity y Three.js

**Implementaciones:**

- **Python**: El código de python se encarga de ejemplificar el uso de transformaciones homogénas.
Primero haciendo uso de un ejemplo en el que se le aplica traslación, rotación y escalado a un cuadrado.
Segundo se muestra sobre la composición de transformaciones y ejemplos que ayudan visualizando que realizar las mismas transformaciones en distinto orden dan resultados diferentes.
Tercero, se realizan las mismas tranformaciones del primer punto pero en un ambiente 3D con unos puntos que forman un cubo.
Cuarto, se tiene un ejemplo sobre cambios de base.
Quinto, se tiene una simulación con un brazo robótico.

- **Unity**:El proyecto de Unity ayuda a entender el proceso que se hace con las funciones ya implementadas en Unity pero con un script propio de transformaciones con matrices. Adicionalmente se ejemplifica una aplicación con unos objetos que hacen de brazo robótico, haciendo rotaciones locales en una cadena de objetos.

- **Three.js**: El proyecto de Three.js renderiza 2 cubos, uno padre y otro hijo, en una escena con lineas representado los ejes del espacio. El cubo jijo se encuentra rotando localmente.
El proyecto presenta 2 situaciones, la primera donde se realiza una traslación  y luego una rotación, y una segunda donde se realiza una rotación y luego una traslación. Hay un btón de interfaz que intercambia entre ambas situaciones.

**Resultados visuales:**

- **Python**:
El siguiente GIF muestra la implementación del brozo robótico.

![GIF de la animación del brazo robótico de "Aplicacion_Robotica_Python.gif"](media/Aplicacion_Robotica_Python.gif)

Muestra de todo el notebook de python.

![GIF de toda la implementación de python en "Implementacion_Python.gif"](media/Implementacion_Python.gif)

- **Unity**:
Este GIF muestra como estos objetos se encuentran efectivamente organizados en una jerarquía padre-hijo. Al mover al objeto padre se mueven también los hijos, pero al mover al hijo no se mueve el objeto padre.

![GIF de jeraquía de objetos en "Sistema_padre_hijo_visualizacion_sistemas_coordenadas_unity.gif"](media/Sistema_padre_hijo_visualizacion_sistemas_coordenadas_unity.gif)

Escena y consola con la visualización de las propiedades matemáticas de las matrices.

![Imagen de visualizacion de escena y consola en "media/No_Comutatividad_unity.png"](media/No_Comutatividad_unity.png)

Salida de consola más a detalle:

![Visualización de consola en "Tranformacion_Inversa_Unity.png"](media/Tranformacion_Inversa_Unity.png)

Muestra de ejecución del codigo de la no conmutatividad e inversa de la matriz.

![GIF de ejecución de script sobre propiedades de matrices en "Transformaciones_programaticas_Unity.gif"](media/Transformaciones_programaticas_Unity.gif)

Muestra cinemática de funcionamiento del script del brazo, en el que si al moificar los valores de rotación local de la articulación 1, la articulación 2 se mueve en relación a esta otra.

![GIF de visualización del funcionamiento del script del braxo robótico en "Brazo_movimiento_Unity.gif"](media/Brazo_movimiento_Unity.gif)

- **Three.js**:
Disposición normal sin rotación del cubo hijo.

![GIF de la visualización del espacio virtual en Composicion_trasnformaciones_y_threematrix4_threejs.gif](media/Composicion_trasnformaciones_y_threematrix4_threejs.gif)

Cambio entre situaciones demostrando la no conmutatividad de las transformaciones.

![GIF de demostración de la no conmutatividad de las transformaciones en Visualizacion_completa_threejs.gif](media/Visualizacion_completa_threejs.gif)

**Código relevante:**

- **Python**:

Transformaciones en 2D

```python
def translation(tx, ty):
    return np.array([
        [1, 0, tx],
        [0, 1, ty],
        [0, 0, 1]
    ])

def rotation(theta):
    return np.array([
        [np.cos(theta), -np.sin(theta), 0],
        [np.sin(theta),  np.cos(theta), 0],
        [0, 0, 1]
    ])

def scaling(sx, sy):
    return np.array([
        [sx, 0, 0],
        [0, sy, 0],
        [0, 0, 1]
    ])

def reflection_x():
    return np.array([
        [1, 0, 0],
        [0, -1, 0],
        [0, 0, 1]
    ])
```

Transformaciones en 3D

```python
def translation(tx, ty, tz):
    return np.array([
        [1, 0, 0, tx],
        [0, 1, 0, ty],
        [0, 0, 1, tz],
        [0, 0, 0, 1]
    ])

def rotation_z(theta):
    return np.array([
        [np.cos(theta), -np.sin(theta), 0, 0],
        [np.sin(theta),  np.cos(theta), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ])
```

Cambios de base

```python
# Nueva base (vectores columna)
B = np.array([
    [1, 1],
    [-1, 1]
])

# Punto en coordenadas base B
v_B = np.array([2, 1])

# Cambio a base estándar
v_E = B @ v_B

# Volver a base B
B_inv = np.linalg.inv(B)
v_B_rec = B_inv @ v_E
```

Creación brazo robótico en 2D

```python
def rot(theta):
    return np.array([
        [np.cos(theta), -np.sin(theta), 0],
        [np.sin(theta),  np.cos(theta), 0],
        [0, 0, 1]
    ])

def trans(x, y):
    return np.array([
        [1, 0, x],
        [0, 1, y],
        [0, 0, 1]
    ])

l1 = 2
l2 = 1.5

fig, ax = plt.subplots()
ax.set_xlim(-4, 4)
ax.set_ylim(-4, 4)
ax.set_aspect('equal')
ax.set_title("Brazo Robótico 2 DOF")

line, = ax.plot([], [], 'o-', linewidth=4)

def update(frame):
    theta1 = np.sin(frame * 0.05) * np.pi/2
    theta2 = np.cos(frame * 0.05) * np.pi/2

    T1 = rot(theta1) @ trans(l1, 0)
    T2 = rot(theta2) @ trans(l2, 0)

    base = np.array([0, 0, 1])
    joint1 = T1 @ np.array([0, 0, 1])
    end_effector = T1 @ T2 @ np.array([0, 0, 1])

    x_vals = [base[0], joint1[0], end_effector[0]]
    y_vals = [base[1], joint1[1], end_effector[1]]

    line.set_data(x_vals, y_vals)
    return line,
```

- **Unity**:
Fragmento de script de Tranformaciones manueales de matrices:

```Csharp
...
        // Punto original (origen en coordenadas locales)
        Vector3 point = Vector3.zero;

        // Crear matriz de traslación
        Matrix4x4 translation = Matrix4x4.Translate(new Vector3(2, 0, 0));

        // Crear matriz de rotación
        Matrix4x4 rotation = Matrix4x4.Rotate(Quaternion.Euler(0, 45, 0));

        // Composición (ORDEN IMPORTA)
        Matrix4x4 composite = translation * rotation;

        // Aplicar transformación al punto
        Vector3 transformedPoint = composite.MultiplyPoint3x4(point);

        // Mover el objeto a la nueva posición
        transform.position = transformedPoint;
...
```

Dibujo de gizmo rojo como visualización del eje X.

```Csharp
...
        Gizmos.color = Color.red;
        Gizmos.DrawLine(transform.position, transform.position + transform.right * axisLength);
...
```

Script de transformaciones de matrices.

```Csharp
...
Matrix4x4 translation = Matrix4x4.Translate(new Vector3(2, 0, 0));
        Matrix4x4 rotation = Matrix4x4.Rotate(Quaternion.Euler(0, 45, 0));

        Matrix4x4 TR = translation * rotation;
        Matrix4x4 RT = rotation * translation;

        Debug.Log("Translation * Rotation:\n" + TR);
        Debug.Log("Rotation * Translation:\n" + RT);
        Matrix4x4 inverse = TR.inverse;
        Matrix4x4 identity = TR * inverse;

        Debug.Log("T * T^-1:\n" + identity);
...
```

Funcionamiento por frame del brazo robótico

```Csharp
...
        joint1.localRotation = Quaternion.Euler(0, angle1, 0);
        joint2.localRotation = Quaternion.Euler(0, angle2, 0);
...
```

- **Three.js**:

Matrices de transformación y definición del orden de operación entre ellas para las dos situaciones

```javascript
...
    const translation = new THREE.Matrix4().makeTranslation(2, 0, 0);
    const rotation = new THREE.Matrix4().makeRotationY(Math.PI / 4);

    const composite = new THREE.Matrix4();

    if (invertOrder) {
      console.log("Orden: Rotación * Traslación");
      composite.multiplyMatrices(rotation, translation);
    } else {
      console.log("Orden: Traslación * Rotación");
      composite.multiplyMatrices(translation, rotation);
    }
...
```

Rotación del objeto hijo

```javascript
...
  useFrame(() => {
    if (childRef.current) {
      childRef.current.rotation.y += 0.02;
      childRef.current.updateMatrixWorld();
    }
 });
...
```

Definición de las coordenadas locales y globales en la escena.

```javascript
...
    <>
      {/* Ejes globales */}
      <axesHelper args={[5]} />

      <mesh ref={parentRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />

        {/* Ejes locales del padre */}
        <axesHelper args={[2]} />

        <mesh ref={childRef} position={[2, 0, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      </mesh>
    </>
...
```

**Prompts utilizados:**

- **Python**: El siguiente prompt debe generar el cuaderno o uno similar:
*Crea un cuaderno de Python que explore las transformaciones homogéneas en 2D y 3D, con ejemplos prácticos en gráficos por computador y robótica. El cuaderno debe incluir: Transformaciones 2D: Explicación de coordenadas homogéneas (x, y, 1) y cómo se aplican traslación, rotación, escalamiento y reflexión usando matrices 3x3. Incluye un ejemplo visual de un cuadrado transformado; Composición de Transformaciones: Demostración de la no conmutatividad de la multiplicación de matrices en transformaciones (e.g., T @ R vs R @ T), con una visualización clara Transformaciones 3D: Extensión a 3D con coordenadas (x, y, z, 1) y matrices 4x4. Muestra un ejemplo de transformación de un cubo; Cambio de Base: Ilustra cómo los cambios de base funcionan usando matrices para convertir coordenadas entre diferentes sistemas de referencia; Aplicación en Robótica (Cinemática Directa): Implementa un brazo robótico planar de 2 grados de libertad (2 DOF) utilizando la composición de transformaciones homogéneas (rotaciones y traslaciones). Debe incluir una animación del brazo robótico en movimiento. Asegúrate de que el código sea claro, con comentarios y visualizaciones que ayuden a entender los conceptos.*

- **Unity**: El siguiente prompt debe generar los scripts que ayudaron en este caso:
*Genera scripts de C# que sirvan como lecciones prácticas: Script de Transformación Manual: Un ejemplo que use Matrix4x4 para combinar una traslación y una rotación. Debe aplicar esta matriz a un Vector3.zero usando MultiplyPoint3x4 y luego asignar ese resultado al transform.position del objeto. Explica en comentarios por qué el orden de multiplicación importa. Script de Propiedades de Matrices: Un script que imprima en consola la diferencia entre T×R y R×T. También debe demostrar cómo obtener la Matriz Identidad multiplicando una matriz por su Inversa. Script de Robótica Básica: Un ejemplo de un brazo robótico simple con dos articulaciones (joint1 y joint2). Debe permitir rotarlas en sus ejes locales usando variables float para los ángulos en el método Update.*

- **Three.js**: El siguiente prompt debe generar el script para la implementación de esta sección.
*Crea una aplicación con React Three Fiber que demuestre visualmente la no-conmutatividad de las matrices de transformación. Necesito un componente que use useRef para acceder a un mesh y manipule su propiedad .matrix manualmente (desactivando matrixAutoUpdate). El usuario debe poder alternar mediante un botón entre dos órdenes de multiplicación: Traslación * Rotación y Rotación * Traslación. Incluye un axesHelper para referencia y un objeto hijo que herede las transformaciones del padre.*

**Aprendizajes y dificultades:**
El taller ayudó a comprender como se aplican las transformaciones homogenéas en distintos entornos, así como el comportamiento de objetos anidados y la importancia de la no conmutatividad entre las transformaciones.
