from oauthlib.oauth2 import WebApplicationClient, rfc6749
import requests
from dotenv import load_dotenv
import os

#####
#### add pip install -r requirements.txt to the makefile to intall python-dotenv
####
site = "https://api.intra.42.fr"
authorization = "https://api.intra.42.fr/oauth/token"
def are_creds_valid():
    load_dotenv()
    client_id = os.getenv('CLIENT_ID')
    client_secret = os.getenv('CLIENT_SECRET')
    client = WebApplicationClient(client_id)
    client.grant_type = "client_credentials"
    auth = client.prepare_request_body(client_id=client_id, client_secret=client_secret)
    response = requests.post(authorization, data=auth)
    client.parse_request_body_response(response.text)
    print(client.token)


def main():
    try:
        are_creds_valid()
        exit(0)
    except rfc6749.errors.InvalidClientError:
        exit(1)


if __name__ == "__main__":
    main()
