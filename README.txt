To Run the Database-Container:
    Build (Navigate to Directory containing the Project, i. e. Fallstudie):
        docker image build  DB -t webdb:latest

    Run:
        docker run webdb:latest


To run the Web-Server:
    Build (Navigate to Directory containing the Project):
        docker image build  WebServer -t webserver:latest

    Run (Server Reachable under localhost:10000):
        docker run -p 10000:8080 webserver:latest

Other Docker Commands:
    List active Containers --> Container ID :
        docker conatiner ls
    
    Enter Container:
        docker exec -it <ContainerID> /bin/bash

    Stop Container:
        docker stop <ContainerID>
    