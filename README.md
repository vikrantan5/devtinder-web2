# Devtinder

create a vite + react project
remove unnecessary code and write hello world

install tailwind
install daisy ui

create navbar componenet
rreact outer dom


create browser router

create browserrouter
create an outlet in body



createa footer

create a l0ogin


create login pge
install axios
add cors in backend the  website

install redux tooll kit and reactredux

configure the store ==>provided the store===>create slice ====>add reducer to the store


logina nd see the redux is wokirin gperfecltl we just refacotr the code to look clean


you should not be able to access the other routes
if no token redirect to the login page
logout
profile


edit profile
show toast




Deployment

signin to aws

lau8nch instanee

chmod 400 secret.pem

frontend

npm install
npm run build
sudo apt update
sudo apt install nginx

sudo systemctl start nginx
sudo systemctl enable nginx


----now all the code copy copde fromt the dist to /var/www/html/

sudo scp -r dist/* /var/www/html/

enable port 80
        add inbound rules








Backend AWS Deployment


        -cd Devtinder backend
        - npm install

        - npm run start

        if do somechanges in local for getting it to the aws do  git pull

        - npm run start use for production

        ip addresss should changes in mongodb also

        enable port 7777 in aws security -->security group--->custome tcp ---->0.0.0.0/0

        - now backed is runnning

        -we cant do that forever with npm start

        -for doi8ng it forever active we use pm2

        - npm install pm2 -g

        -pm2 start npm -- start

        - checking the logs -->pm2 logs

        -cleariong the logs -->pm2 flush <npm>

        -show all the list of process -->pm2 list
        -stopping the process -->pm2 stop <npm>
        -deleting the process --> pm2 delete <npm>

        -giving the name to proce3ss
 -->pm2 start npm --name "devtinder-backend" -- start

        frontend = http://43.204.96.49/
        backend = http://43.204.96.49:7777/

        domain name = devtinder.com =>http://43.204.96.49/
        backeng = devtinder.com:7777 =>devtinder.com/api



        nginx file edit - sudo nano /etc/nginx/sites-available/default

        change the server_name <current_ip>;

        location /api/ {
        proxy_pass http://localhost:7777/;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }



    restart nginx - sudo systemctl restart nginx

now connectuing frontend and backend

        modify the base url in frojntend project