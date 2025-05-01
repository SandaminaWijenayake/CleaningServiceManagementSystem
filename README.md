I try do deploy backend online but couldn't find a good website. most of them even if they are free they ask for credit card. so you have to clone my backend and test front-end with netlify.

Clone the backend from this repository: [your-backend-repo-link]
nside the backend folder, run:
npm install
npm start
This will start the JSON server 

now you can test the netlify app. 

username - admin
password - admin123 

User Authentication
After login, the logged-in user is identified and tracked using localStorage.

Service Booking
The user can navigate to the Booking page and submit a service request.

Booking List
On the Booking List page, the user can: 
  View only their own service requests (based on their stored identity in localStorage).
  Edit or delete their own bookings.

Logout Behavior 
  On logout:
  All localStorage data is cleared.
  The user is fully logged out and cannot access protected pages via the URL.

Admin Privileges
The admin can:
  View all users and bookings.
  Edit or delete any record.
  The admin panel is restricted: Normal users cannot access it, even by manually entering the URL.

  simple design, react router for navigation
