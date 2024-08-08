function emailValidation() {
    let email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g;

    return emailRegex.test(email);
}

function passwordValidation() {
    let password = document.getElementById('password').value;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;

    return passwordRegex.test(password);
}

document.getElementById('submit-btn').addEventListener('click', async (event) => {
    event.preventDefault();

    if (emailValidation()) {
        await sendData();
    } else {
        document.getElementById('error').classList.add('show')
        document.getElementById('error').innerHTML = 'Invalid email or password'
        console.log('Invalid email or password');
    }
});

async function sendData() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let url = 'https://reqres.in/api/login';
    let config = {
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        let response = await fetch(url, config);
        
        if (response.ok) {
            let data = await response.json();
            localStorage.setItem('token', data.token);
            console.log(data);
            console.log('Login successfully');
            location.replace('../home.html')
        } else {
            console.log('Error:', response.status);
        }
    } catch (error) {
        console.log('Network error:', error);
    }
}

