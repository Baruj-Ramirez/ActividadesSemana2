# Taller Espacios Proyectivos Matrices Proyeccion

## Nombres de los Estudiantes

* Alejandro Ortiz Cortes
* John Alejandro Pastor Sandoval
* Nicolas Quezada Mora
* Baruj Vladimir Escalante Ramirez
* Joan Sebastian Puerto Roberto
* Nicolas Rodriguez Piraban

**Fecha de entrega:** 27 de febrero de 2026

---

## Descripción breve

El presente taller tiene como objetivo comprender y aplicar los fundamentos de la geometría proyectiva y el uso de matrices de proyección para representar escenas tridimensionales en un plano bidimensional, concepto esencial dentro del *pipeline gráfico moderno*.

Durante el desarrollo se implementaron diferentes entornos de visualización para analizar cómo funcionan las proyecciones ortogonales y en perspectiva, así como la simulación del comportamiento de una cámara virtual.

---

## Implementaciones

Se trabajaron cuatro implementaciones principales:

* Python (cálculo matemático y visualización)
* Unity (Motor gráfico con cámaras y escenas en 3D)
* Three.js con React Three Fiber (entorno web interactivo)
* Processing (simulación gráfica directa de cámaras)

Cada implementación permitió observar desde distintos enfoques cómo las matrices de proyección transforman la percepción espacial.

### 1. Python

**Descripción**
El notebook de python representa una figura 3D en coordenadas homogeneas, hace uso de matrices de proyección para dibujar sobre un  plano 2D en perspectiva u ortogonal,  compara visualmente la figura con sus proyecciones y dibuja en perspectiva a distintas distancias h.

**Resultados visuales**
Muestra de todo el código con los resultados
![GIF del todo el código Python](media/python.gif)
Resultados concretos de la figura en 3D con sus proyecciones enn un plano 2D, así como la proyección en perspectiva a distintas distancias.
![Resultados del código Python](media/python.png)

### 2. Unity

**Descripción**
El proyecto de Unity es una escena en la que se ubican distintos cubos a una distancia y luego se compara con una camara ortografica y otra en perspectiva.

**Resultados visuales**
Ubicación de los objetos en la escena
![Imagen de los objetos en la escena](media/Unity.png)
Comparación de la vista de la proyección entre las dos camaras lado a lado, notese que la profundidad solo es claramente visible en la cámara en perspectiva.
![Comparación de las dos cámaras con distintas proyecciones](media/unity.gif)

### 3. Three.js

**Herramientas utilizadas**

* React
* Three.js
* @react-three/fiber
* @react-three/drei
* OrbitControls

**Descripción**

Se desarrolló una escena 3D interactiva en navegador que simula el comportamiento real de cámaras utilizadas en motores gráficos.

Características implementadas:

* Tres objetos posicionados a distintas profundidades sobre el eje Z.
* Cámara Perspective.
* Cámara Orthographic.
* Botones para cambiar entre cámaras.
* Navegación libre mediante OrbitControls.

El objetivo fue visualizar cómo cambia la percepción espacial al modificar el tipo de proyección.

**Resultados visuales**

Cámara de perspectiva
![threejs/perspective](media/threejs_perspective.gif)

Cámara ortografica
![threejs/orthographic](media/threejs_orthographic.gif)

**Observaciones**

* PerspectiveCamera simula visión humana.
* OrthographicCamera mantiene tamaños constantes.
* OrbitControls permite entender la relación cámara-escena.

---

### 4. Processing (2D/3D)

**Herramientas utilizadas**

* Processing (modo P3D)

**Descripción**

Se creó un entorno 3D básico con objetos distribuidos sobre el eje Z para simular el cambio entre tipos de cámara utilizando:

* `perspective()`
* `ortho()`

El usuario puede alternar dinámicamente entre proyecciones y observar el cambio visual inmediato.

Implementaciones realizadas:

* Sistema de iluminación básica.
* Rotación de escena.
* Representación de ejes cartesianos.
* Cambio de cámara mediante interacción por teclado.

**Resultados visuales**

Cámara de perspectiva
![processing/perspective](media/processing_perspective.gif)

Cámara ortografica
![processing/orthographic](media/processing_orthographic.gif)

**Observaciones**

* Perspective genera sensación de profundidad.
* Ortho elimina puntos de fuga.
* Se evidencia claramente el concepto de proyección proyectiva.

---

## Código relevante

### Funciones Python

Funciones de conversion de y a homogeneas

```python
def a_homogeneas(puntos):
    """Convierte puntos (3, N) a coordenadas homogeneas (4, N)."""
    return np.vstack([puntos, np.ones((1, puntos.shape[1]))])

def desde_homogeneas(puntos_h):
    """Normaliza por w y regresa coordenadas euclidianas."""
    return puntos_h[:-1] / puntos_h[-1]
```

Matrices de proyección

```python
    def matriz_ortogonal_xy():
    """Proyeccion ortogonal sobre el plano XY."""
    return np.array([
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 1],
    ], dtype=float)

def matriz_perspectiva(d=1.0):
    """Proyeccion perspectiva con distancia focal d (d > 0)."""
    if d <= 0:
        raise ValueError('d debe ser mayor que 0')
    return np.array([
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 1/d, 0],
    ], dtype=float)
```

Proyección

```python
def proyectar(puntos, P):
    """Aplica una matriz 4x4 a puntos 3D (3, N) y regresa (3, N)."""
    puntos_h = a_homogeneas(puntos)
    proy_h = P @ puntos_h
    return desde_homogeneas(proy_h)
```

Función de dibujo en 2D

```python
def dibujar_2d(ax, proy, vertices_proy, titulo):
    ax.scatter(proy[0], proy[1], s=20, alpha=0.75)
    ax.scatter(vertices_proy[0], vertices_proy[1], s=50, color='crimson')
    for i, j in aristas:
        ax.plot([vertices_proy[0, i], vertices_proy[0, j]],
                [vertices_proy[1, i], vertices_proy[1, j]], color='crimson', linewidth=1.6)
    ax.set_title(titulo)
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.set_aspect('equal', adjustable='box')    
```

### Cambio de Cámara en React Three Fiber

```jsx
<OrbitControls />
<PerspectiveCamera makeDefault />
<OrthographicCamera makeDefault />
```

---

### Cambio de Proyección en Processing

```java
if (usarPerspective)
    perspective();
else
    ortho();
```

---

## Prompts utilizados

Durante el desarrollo se empleó IA generativa como apoyo conceptual y estructural.
Principales usos:

* Generación de ejemplos base de escenas 3D.
* Explicación de matrices de proyección.
* Organización del código en distintos entornos gráficos.
* Creación de documentación técnica (README).

Ejemplos de prompts:

* *"Crear escena Three.js con cámara ortográfica y perspectiva"*
* *"Simular proyección perspectiva usando matrices homogéneas en Python"*
* *"Ejemplo Processing con perspective() y ortho()"*

La IA fue utilizada como herramienta de apoyo educativo y no como sustituto del aprendizaje.

---

## Aprendizajes y dificultades

### Aprendizajes

* Comprensión práctica de la geometría proyectiva.
* Uso de coordenadas homogéneas en transformaciones 3D.
* Relación entre matemáticas y motores gráficos reales.
* Funcionamiento interno de cámaras virtuales.
* Diferencias conceptuales entre geometría euclidiana, afín y proyectiva.
* Importancia de las matrices dentro del pipeline gráfico moderno.

Se evidenció que herramientas como Three.js y Processing implementan internamente los mismos conceptos matemáticos desarrollados manualmente en Python.

---

### Dificultades

* Entender inicialmente la normalización por coordenada homogénea `w`.
* Visualizar la diferencia entre profundidad real y percepción visual.
* Ajustar correctamente parámetros como distancia focal y planos de proyección.
* Relacionar la teoría matemática con la implementación gráfica.

Superar estas dificultades permitió comprender cómo un sistema 3D realmente se proyecta sobre una pantalla 2D.

---

## Conclusión

El taller permitió conectar la teoría matemática de espacios proyectivos con su aplicación práctica en gráficos computacionales modernos.
Se comprobó que todas las herramientas gráficas actuales (desde motores web hasta entornos visuales) utilizan exactamente los mismos principios de proyección estudiados, demostrando la relevancia fundamental de las matrices de proyección dentro del desarrollo gráfico contemporáneo.

---
