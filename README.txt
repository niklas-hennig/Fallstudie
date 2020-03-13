To Build and Run the Container:
    Build (Navigate to Directory containing the Project-Folder, the folder above the repository):
        docker image build Fallstudie -t server:latest

    Run (Server Reachable under localhost, api serving on port 2001, database reachable on port 5432):
        docker run -p 80:80 -p 2001:2001 -p 5432:5432 --rm --name server server:latest
        docker exec -d server service nginx restart

Other Docker Commands:
    List active Containers --> Container ID :
        docker conatiner ls
    
    Enter Container:
        docker exec -it <ContainerID> /bin/bash

    Stop Container:
        docker stop <ContainerID>
    
