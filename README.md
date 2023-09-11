## LCC-react_form
###### Que es?
Es una  pequeña libreria para manejar formularios en react

#### Como trabajamos
En la aplicación estamos aplicando el git flow lo que implica:

1) cuando se esta desarrollando una funcionalidad o característica nueva tenemos que
crear una rama nueva a partir de `develop`
2) Esa rama que creemos tiene que tener como nombre la incidencia de Jira (ver en Links importantes)
de la tarea que estemos tratando
- Ejemplo `SNTAB-1232`
3) Cada commit que hagamos tiene que comenzar con el nombre de la rama, seguido del
    resumen de lo realizado en el commit
4) Una vez terminada la funcionalidad la pusheamos al repositorio remoto
    y desde ahi creamos una Pull Request a `develop`
5) Las Pull Request tienen que ser revisadas y aprobadas para poder realizar el merge
    a la rama develop


#### Test
###### Para correr todos los test: `npm run test`

#### Linter
###### Para correr el linter `npm run lint`
###### Para correr el linter que se ejecutara al intentar mergear a la rama dev o master `npm run pipeline-lint`
###### Para fixear todos los problemas en el proyecto `npm run lint-fix` (dentro de lo que se pueda)
