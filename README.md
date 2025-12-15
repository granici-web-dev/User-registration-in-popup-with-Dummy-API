# You are developing a part of a web application where users can register. To simulate working with a real backend, use the DummyJSON test API.

1. Modal window:
   “Register” button in the main interface to open the modal window
   The modal window appears on top of all content with a semi-transparent background
   Several ways to close it:
   The “×” button in the corner of the window
   Click outside the modal window area
   The Esc key
   The “Cancel” button in the form

2. Registration form:
   Fields (in accordance with the DummyJSON API):
   Username *required
   Email *required
   Password *required, minimum 6 characters
   First name *required
   Last name *required
   Age *required, number from 18 to 100

   Checkbox “I agree to the terms of use”
   Password confirmation field (on the front end)

3. Validation:
   Client validation:
   All required fields are filled in.
   Email matches the format.
   Password is ≥ 6 characters.
   Password and confirmation match.
   Age is within the acceptable range.
   Consent checkbox is checked.

   Server validation: via API response
   Error handling (e.g., username already taken)

4. Integration with DummyJSON API:
   Endpoint: POST https://dummyjson.com/users/add
   Data submission: upon successful client validation
   Response handling:
   Success (200-299): display a message about successful registration, close the modal window after 2 seconds
   Error (400-499): display an error message under the corresponding field
   Network error: general connection error message

5. UI/UX requirements:
   Loading indicator: show spinner/indicator when sending the form

   Send button states:
   Inactive until the form is valid
   Text changes to “Sending...” when sending

   Error display:
   Under each field in real time
   Red border around invalid fields
   General API errors above the form

   Successful registration:
   Show green notification
   Output the received user data to the console (for verification)
   Automatic window closure

6. Additional functionality (optional):
   Modal login window: using POST https://dummyjson.com/auth/login
   Switch between registration and login in one modal window
   Save token in localStorage upon successful login

Successful registration:
username: “john_doe”
email: “john@example.com”
password: “password123”
firstName: “John”
lastName: “Doe”
age: 25

Error (for testing):
username: “” (empty)
email: “invalid-email”
password: “123” (short)

Translated with DeepL.com (free version)
