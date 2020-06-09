To Build and Run the Container:
    Build (Navigate to Directory containing the Project-Folder, the folder above the repository):
        docker image build Fallstudie -t server:latest

    Run (Server Reachable under localhost, api serving on port 2001, database reachable on port 5432):
        docker run -p 80:80 -p 2001:2001 -p 5432:5432 --rm --name server server:latest
        

Other Docker Commands:
    List active Containers --> Container ID :
        docker conatiner ls
    
    Enter Container:
        docker exec -it <ContainerID> /bin/bash

    Stop Container:
        docker stop <ContainerID>


API-Dokumentation:
All API-ENdpoints are to be found on Port 2001. Path is <host>:2001/api/<Endpoint>

    testCookie: get:    gives Text with all cookies
    testAuth:   get:    returns if Authentification is valid (true: 200, false:401)
    User:       post:   Creates new User, expects json in body with username, password and email, if created return user_id, else code 400 for already exisitng user or 500 for error in backend
    User:       delete: Deltes User by username, expexects /User/<username_to_delete>. Username is an unnamed parameter
    User:       put:    Updates User, expects json body with username in it, else code 400 and at least password or email
    Authentification: post: Sets auth cookie. Expects json body with username and password else -> 400. return 200 and cookie if successful
    Authentification: delete: Logout-Mechanism, no information needs to be provided
