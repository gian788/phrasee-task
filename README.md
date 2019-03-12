Phrasee backend technical test

You are tasked with writing a small application that takes a feed of notifications, aggregates, and displays them.

The algorithm should be packaged in a web server that exposes appropriate endpoints.

An web interface to view the resultant feed and any interaction capability should also be provided, this does not have to be elaborate or very time consuming.

The notification feed is from a hypothetical social website that allows users to write posts, like posts and comment on posts.

The notifications can be of two types: Like and Comment. Like indicates that one user liked a user's post and Comment indicates that one user commented on a user's post.

The notifications should at minimum be aggregated per type and post. You'll be provided with a file containing a JSON of the notifications feed and another file showing an example of how the notifications could be aggregated.

Please note that the order in which the notifications are served or aggregated is irrelevant and functionality/display options are open to your interpretation if you wish.

We are looking for a response that is as close to production ready as possible, properly packaged, and supplied with deployment instructions.

Ideally this will be delivered as a link to a git repository but a zip file is also acceptable.

These instructions are deliberately left vague as we are interested as much in your architecture decisions as your coding skills.

## Installation
Run `npm install` in both `client` and `server` folders

## Usage
Run `npm start` in both `client` and `server` folders.
The go to `http://localhost:3000`
