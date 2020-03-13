To Build and Run the Container:
    Build (Navigate to Directory containing the Project-Folder, the folder above the repository):
        docker image build  Fallstudie -t server:latest

    Run (Server Reachable under localhost:10000):
        docker run -p 10000:80 server:latest

Other Docker Commands:
    List active Containers --> Container ID :
        docker conatiner ls
    
    Enter Container:
        docker exec -it <ContainerID> /bin/bash

    Stop Container:
        docker stop <ContainerID>
    
