# Simple blog with expresss
Simple blog with NodeJs, Express, MySQL, Handlebars, HTML, CSS, JS and Bootstrap.

In this project, use MVC architectural pattern.

## Database
- **Use MySQL database in this project with structure below.**


------------


1. Table name : **posts**


|  **#**  |  **Name**  | **Type**  | **Default**  | **Extra**   |
| :------------: | :------------: | :------------: | :------------: | :------------: |
|  1 |  id |  int(11) | None  |  AUTO_INCREMENT |
|  2 |  author_id |  int(11) |  None |   |
|  3 | title  |   varchar(100)| None  |   |
|  4 |  slug |  varchar(100) |  None |   |
| 5  | content  |  longtext | None  |   |
| 6  |  status | tinyint(1) | None  |   |
|  7 |  views | int(11) |  0 |   |
|  8 |  comments | int(11)  |  0 |   |
|  9 |  thumbnail |  text |  NULL |   |
| 10  | created_at  |  datetime |  current_timestamp() |   |

------------


2. Table name : **comments**


|  **#**  |  **Name**  | **Type**  | **Default**  | **Extra**   |
| :------------: | :------------: | :------------: | :------------: | :------------: |
|  1 |  id |  int(11) | None  |  AUTO_INCREMENT |
|  2 |  author_id |  int(11) |  NULL |   |
|  3 | post_id  |   int(11) | None  |   |
|  4 |  user_name |  varchar(100) |  None |   |
| 5  | user_email  |   varchar(100) | None  |   |
| 6  |  comment | text | None  |   |
|  7 |  status | tinyint(4) |  0 |   |
|  8 |  parent | int(11)  |  0 |   |
| 9  | created_at  |  datetime |  current_timestamp() |   |

------------


3. Table name : **users**


|  **#**  |  **Name**  | **Type**  | **Default**  | **Extra**   |
| :------------: | :------------: | :------------: | :------------: | :------------: |
|  1 |  id |  int(11) | None  |  AUTO_INCREMENT |
|  2 |  full_name |  varchar(100) |  None |   |
|  3 | email  |  varchar(100) | None  |   |
|  4 |  password |  varchar(100) |  None |   |
| 5  | description  |  text | NULL  |   |
|  6 |  role | tinyint(2) |  0 |   |
|  7 | created_at  |  datetime |  current_timestamp() |   |

------------


4. Table name : **settings**


|  **#**  |  **Name**  | **Type**  | **Default**  | **Extra**   |
| :------------: | :------------: | :------------: | :------------: | :------------: |
|  1 |  id |  int(11) | None  |  AUTO_INCREMENT |
|  2 |  setting_name |  varchar(100) |  None |   |
|  3 | setting_value  |  text | None  |   |



------------

- **Note:** for saving session in database used [express-mysql-session package](https://github.com/chill117/express-mysql-session "express-mysql-session package"). This package automatically create a sessions table for saving sessions.


## .env file
create **.env** file like below structure.

    #app
    APP_PORT=5000
    APP_NAME=express_blog
    APP_ENV=local
    
    #mysql
    MYSQL_HOST=localhost
    MYSQL_PORT=3306
    MYSQL_USER=root
    MYSQL_PASSWORD=
    MYSQL_DATABASE=express_blog

## Installation
After make [database](https://github.com/amirkangarloo/simple-blog-with-expresss/new/master?readme=1#database "database") & create [**.env** file](https://github.com/amirkangarloo/simple-blog-with-expresss/new/master?readme=1#env-file "**.env** file"), write commands below into command line in your machine.

**first step**
```javascript
git clone https://github.com/amirkangarloo/simple-blog-with-expresss.git
```
**second step**
```javascript
npm install
```
**third step**
```javascript
npm start
```

## License
[MIT](https://choosealicense.com/licenses/mit/)

