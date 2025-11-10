#  TaskFlow

**TaskFlow** es una aplicación fullstack desarrollada con **Java + Spring Boot** en el backend y **React** en el frontend.  
Permite a los usuarios registrarse, iniciar sesión y gestionar tareas personales mediante un sistema de autenticación segura basado en **JWT**.  

El frontend es completamente responsive y se adapta a PC, tablets y celulares.

---

##  Tecnologías

###  Backend
- Java 17  
- Spring Boot  
- Spring Security + JWT  
- Spring Data JPA  
- MySQL  
- Maven  

###  Frontend
- React  
- HTML, CSS (diseño responsive personalizado)  
- JWT Decode  

---

##  Funcionalidades

- ✅ Registro y login de usuarios (con generación de JWT)  
- ✅ Autenticación y autorización segura  
- ✅ CRUD completo de tareas (crear, leer, actualizar, eliminar)  
- ✅ Solo el propietario puede editar o eliminar sus tareas  
- ✅ Manejo global de errores con `@RestControllerAdvice`  
- ✅ Validaciones con `@Valid`  
- ✅ Validaciones visuales en frontend (por ejemplo, fechas no válidas)  
- ✅ Configuración CORS para frontend  
- ✅ Interfaz intuitiva y responsive  

---

##  Estructura del Proyecto (Backend)

```
com.taskflow
├── config          # Configuraciones generales (CORS, Beans, etc.)
├── controller      # Endpoints HTTP (REST)
├── dto             # Data Transfer Objects
├── exception       # Excepciones personalizadas y handler global
├── interceptor     # Interceptores para lógica previa/post ejecución
├── model           # Entidades JPA
├── repository      # Interfaces JPA (acceso a datos)
├── security        # Configuración de seguridad y JWT
├── service         # Lógica de negocio
└── TaskflowApplication.java # Clase principal (entry point)
```

---

##  Autenticación

La seguridad está basada en **JWT**.

### Endpoints de autenticación

| Método | Endpoint           | Descripción |
|--------|--------------------|--------------|
| POST | `/api/auth/register` | Registro de nuevo usuario |
| POST | `/api/auth/login` | Login de usuario y generación de JWT |

- Al hacer login, se genera un **token JWT**.  
- Este token debe enviarse en cada petición protegida dentro del header:

```
Authorization: Bearer tu_token_aquí
```

---

##  Endpoints de Tareas (Requiere JWT)

| Método | Endpoint           | Descripción |
|--------|--------------------|--------------|
| POST   | /api/tasks         | Crear una nueva tarea |
| GET    | /api/tasks         | Obtener todas las tareas del usuario |
| GET    | /api/tasks/{id}    | Obtener una tarea específica |
| PUT    | /api/tasks/{id}    | Editar una tarea (solo si es dueño) |
| DELETE | /api/tasks/{id}    | Eliminar una tarea (solo si es dueño) |

---

##  Probar con Postman

1. Registrarse o loguearse en `/api/auth/login`.  
2. Copiar el token JWT de la respuesta.  
3. En cada petición protegida, agregar el header:

```
Authorization: Bearer tu_token_aquí
```

---

##  Configuración local (con Docker + MySQL)

###  Requisitos
- Docker y Docker Compose  
- Java 17+  
- Maven o Gradle  

---

###  Paso 1: Variables de entorno
Crear un archivo `.env` en la raíz copiando de `.env.example` y, si lo deseas, ajustar los valores.

**Ejemplo (.env.example):**
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=taskflow
DB_USER=appuser
DB_PASSWORD=appsecret
DB_ROOT_PASSWORD=rootsecret
```

---

###  Paso 2: Levantar la base de datos
Desde la raíz del proyecto, ejecutar:

```bash
docker compose up -d
```

🔹 Esto levantará un contenedor MySQL que ejecutará automáticamente los scripts dentro de `docker/init`  
(por ejemplo `00_dump.sql`) para crear el esquema de la base y sus tablas.

---

###  Paso 3: Ejecutar la aplicación

**Con Maven:**
```bash
./mvnw spring-boot:run
```

**Con Gradle:**
```bash
./gradlew bootRun
```

La API quedará disponible en:  
 [http://localhost:8080](http://localhost:8080)

---

##  Configuración del Backend sin Docker (opcional)

Si preferís usar tu instalación local de MySQL:

1. Crear la base de datos manualmente:
   ```sql
   CREATE DATABASE taskflow CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
   ```

2. Configurar tu `application.yml` o `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/taskflow
   spring.datasource.username=root
   spring.datasource.password=tu_contraseña
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   ```

---

##  Frontend

Si tu frontend está en un repo separado:

```bash
git clone https://github.com/AlMartinezUy/taskflow-frontend.git
cd taskflow-frontend
npm install
npm start
```

Asegurate de que el backend esté corriendo en `http://localhost:8080`.

---

##  Autor

Creado por **Álvaro Martinez** como parte de mi formación como **Desarrollador Backend Java**.  

Este proyecto demuestra mi manejo de:
- Spring Boot  
- JWT  
- Validaciones backend y frontend  
- Arquitectura limpia  
- Integración fullstack con React  
- Diseño responsive  

---

##  Agradecimientos

Gracias por visitar este repositorio.  
¡Cualquier sugerencia o mejora es bienvenida! 
