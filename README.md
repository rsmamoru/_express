# _express
This project is a Node JS based application that try to imitate the XAMPP stack.

### Background
I used to work using XAMPP stack before this. The good thing with XAMPP is that we can place multiple PHP websites on one running web server without having to reconfigure or restart the server. That is very convenient and I miss it when using Node JS.

### Workaround
In this project, I use the [Express](//expressjs.com) framework, but I don't really use the directory structure. Here is my scenario to get as close as possible to what XAMPP has:

1. The PHP websites must be placed inside the `htdocs` folder. Each subfolder is responsible for one website and contains all the files including client and server codes. Since `htdocs` folder can serve static contents, the similar folder in Express is the `public` folder.

2. In PHP, client and server codes can be mixed in one file. We can't do that in Node JS. We cannot mention a `*.js` file directly in URL and execute it as server code.
So using Express, we have to process the client request according to the subfolder mentioned in the URL. And of course, the requested server code in that subfolder must be accessed using modular way, e.g. built-in Common JS functionality.

3. In XAMPP, if the submitted URL ends without mentioning any file, then the web server will find `index.php|html|htm` file or `default.php|html|htm` file. This is the basic behavior of XAMPP, if not overwritten by `.htaccess` file.
In this project, first I set the default HTTP error code to 404. Then I pass the client request to the `app.js` file inside the requested subfolder. That file should contain server code to handle the request. If the file doesn't exist or it doesn't send any response to the client, then I will find `index.htm|html` file in the same location. From this point onwards, the control has been handed over to the browsed website.

### Demo website
There's still only one website in this project, named `perpus`. It uses Ajax for all the requests, so it becomes one-page app. The data is stored in SQLite at the server side. The demo is hosted in [~~OpenShift~~](//node-uwg.rhcloud.com/perpus) (it has runtime errors) and [Heroku](//node-uwg.herokuapp.com/perpus). Please login with Pengguna: `admin` and Sandi: `admin`.

<br>
Good luck!  
Muhammad Yahya Muhaimin
