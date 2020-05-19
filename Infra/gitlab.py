#!/usr/bin/python3
import sys
import requests
import json

# get token

users = ['beauco_j', 'le_j']
newUserPassword = 'PASSW0RD'

rootPassword = 'Makaveli'

ip = sys.argv[1]

url = "http://" + ip + "/oauth/token"
headers = { 'Content-Type': 'application/json' }
payload = "{\r\n\"grant_type\":\"password\",\r\n\"username\":\"root\",\r\n\"password\":\"" + rootPassword + "\"\r\n}"

response = requests.request("POST", url, headers = headers, data = payload)
token = json.loads(response.text.encode('utf8'))['access_token']

# create users

url = "http://" + ip + "/api/v4/users"
headers = {
	'Authorization': 'Bearer ' + token,
	'Content-Type': 'application/json'
}

for user in users:
	payload = "{\n\t\"email\": \"" + user + "@gitlab.com\",\n\t\"username\": \"" + user + "\",\n\t\"password\": \"" + newUserPassword + "\",\n\t\"name\": \"" + user + "\",\n\t\"admin\": \"true\"\n}\n"
	requests.request("POST", url, headers = headers, data = payload)
