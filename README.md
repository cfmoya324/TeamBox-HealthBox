# HealthBox

Este proyecto universitario para la materia de *Proyecto Informático 1* consiste en una plataforma de software para gestionar y registrar riesgos en el área de trabajo, en línea con los requisitos de la norma *ISO 45001*, que establece un marco para sistemas de gestión de seguridad y salud en el trabajo (SST). La plataforma de software facilitará la identificación, evaluación y control de riesgos laborales, contribuyendo a entornos de trabajo más seguros y saludables. 

Además, este proyecto se alinea con el *Objetivo de Desarrollo Sostenible* (ODS) 8, el cual promueve el trabajo decente y el crecimiento económico a través de metas específicas como: mantener el crecimiento económico sostenible (8.1), aumentar la productividad mediante la innovación (8.2), fomentar la creación de empleo decente y el emprendimiento (8.3), desvincular el crecimiento económico de la degradación ambiental (8.4), garantizar el empleo pleno y productivo para todos (8.5), reducir el desempleo juvenil (8.6), erradicar el trabajo forzoso y el trabajo infantil (8.7), proteger los derechos laborales y promover entornos de trabajo seguros (8.8), impulsar el turismo sostenible (8.9), fortalecer las instituciones financieras (8.10), y apoyar el empleo juvenil a nivel global (8.b). 

Aunque la plataforma no abordará directamente todas estas metas, el proyecto en su conjunto está diseñado para apoyar a las organizaciones en su alineación con el *ODS 8* y el cumplimiento de la *ISO 45001*, promoviendo entornos laborales más inclusivos, sostenibles y productivos. 

## Integrantes de TeamBox

- Jonathan Steven Narvaez Navia
- Karol Lizeth Payares Vizcaino
- Luis Felipe Villota Escobar
- Camilo Franco Moya

## Comandos a tener en cuenta en el back y front

- `npm install`: Descarga las dependencias de cada proyecto.
- `npm start`: Ejecuta el proyecto en modo de desarrollo.

Recuerda añadir las credenciales de base de datos y de correo al backend.

## Tecnologías

**Frontend:** Se ha desarrollado utilizando la librería de interfaces de usuario *React* y el cliente de HTTP basado en promesas *Axios*.

**Backend:** Se ha desarrollado utilizando el framework de aplicaciones web *Express* y la librería de envio de correos electrónicos *Nodemailer*.

**Base de datos:** Se utiliza la base de datos no relacional orientada a documentos *MongoDB*, conectandola al backend por medio de la librería *Mongoose*.

## Estructura de la base de datos

Se utilizan 4 colecciones en la base de datos del proyecto: users, standards, saquestions, y selfassessments.

### users

```
{
  fullName: String,
  email: String,
  password: String,
  role: String,
  isActive: Boolean
}
```
role -> ["administrador", "auditor", "supervisor", "trabajador"]

### standards

```
{
  name: String
}
```

### saquestions

```
{
  text: String,
  isAnswered: Boolean,
  type: String,
  standard: String,
  response: String,
}
```
type -> ["abierta", "si_no", "escala"]

### selfassessments

```
{
  standard: String,
  createdBy: mongoose.Schema.Types.ObjectId, // user
  questions: [saquestions],
  createdAt: Date
}
```

## Estructura de la API

Existen 5 rutas principales de la API: auth, users, standards, questions, y self-assessments.

### API/AUTH

**GET** -> */users* -> Obtiene todos los usuarios.

**POST** -> */login* -> Inicia sesión utilizando un correo y contraseña.

### API/USERS

**POST** -> */* -> Crea a un usuario.

**PUT** -> */:id* -> Edita a un usuario.

**DELETE** -> */:id* -> Elimina a un usuario.

**PATCH** -> */:id/role* -> Edita el rol de un usuario.

### API/STANDARDS

**GET** -> */* -> Obtiene todas las normativas.

**POST** -> */* -> Crea una normativa.

**PUT** -> */:id* -> Edita una normativa.

**DELETE** -> */:id* -> Elimina una normativa.


### API/QUESTIONS

**GET** -> */* -> Obtiene todas las preguntas de todas las normativas.

**POST** -> */* -> Crea una pregunta.

**PUT** -> */:id* -> Edita una pregunta.

**DELETE** -> */:id* -> Elimina una pregunta.

### API/SELF-ASSESSMENT

**GET** -> */* -> Obtiene todas las autoevaluaciones de un usuario específico.

**GET** -> */questions/:standard* -> Obtiene todas las preguntas de una normativa específica.

**POST** -> */* -> Crea una autoevaluación.

**POST** -> */export* -> Genera el PDF de una autoevaluación y se envia al correo del usuario que ha iniciado sesión.
