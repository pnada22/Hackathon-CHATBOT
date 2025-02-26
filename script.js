document.addEventListener('DOMContentLoaded', () => {
    const demoBtn = document.getElementById('demo-btn');
    const demoSection = document.getElementById('demo');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const typingIndicator = document.getElementById('typing-indicator');
    const quickResponses = document.getElementById('quick-responses');

    function useChat({ api }) {
        async function handleSubmit(event) {
            event.preventDefault();
            const userMessage = userInput.value.trim();
            if (!userMessage) return;

            addMessage('user', userMessage);
            userInput.value = '';
            typingIndicator.classList.remove('hidden');

            try {
                const response = await fetch(api, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: userMessage })
                });

                const data = await response.json();
                addMessage('ai', data.reply);
            } catch (error) {
                addMessage('ai', 'Error: Unable to reach AI.');
            }

            typingIndicator.classList.add('hidden');
        }

        return { handleSubmit };
    }

    const { handleSubmit } = useChat({ api: '/api/chat' });

    demoBtn.addEventListener('click', () => {
        demoSection.classList.remove('hidden');
        demoSection.scrollIntoView({ behavior: 'smooth' });
    });

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleSubmit(e);
    });

    function addMessage(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${role}-message`);
        messageDiv.textContent = content;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    const quickResponseSuggestions = [
        "Tell me more about NeoChat AI",
        "What can you do?",
        "How do you learn?",
        "Show me a cool feature"
    ];

    quickResponseSuggestions.forEach(suggestion => {
        const button = document.createElement('button');
        button.classList.add('quick-response-btn');
        button.textContent = suggestion;
        button.addEventListener('click', () => {
            userInput.value = suggestion;
            chatForm.dispatchEvent(new Event('submit'));
        });
        quickResponses.appendChild(button);
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
        elements.forEach((el) => {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
                el.classList.add("visible");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
});


const createParticle = () => {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    document.body.appendChild(particle);

    const size = Math.random() * 6 + 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDuration = `${Math.random() * 3 + 2}s`;

    setTimeout(() => { particle.remove(); }, 5000);
};

setInterval(createParticle, 200);







// Typing effect for main title and subtitle
// Function for typing effect
const typeEffect = (element, text, speed = 100, callback) => {
    let index = 0;
    const type = () => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else if (callback) {
            setTimeout(callback, 500);
        }
    };
    element.innerHTML = ""; // Reset text before retyping
    type();
};

// Function to observe when #home section comes into view
const observeTypingEffect = () => {
    const homeSection = document.querySelector("#home");
    const title = document.querySelector("#home h1");
    const subtitle = document.querySelector("#home p");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                typeEffect(title, "Experience the Future of Conversation", 80, () => {
                    typeEffect(subtitle, "NeoChat AI: Where Intelligence Meets Imagination", 60);
                });
            }
        });
    }, { threshold: 0.6 });

    observer.observe(homeSection);
};

// Function to animate elements when they enter the viewport
const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, index * 300); // Staggered effect
            } else {
                entry.target.classList.remove("visible"); // Reset when out of view
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
};

// Initialize animations and typing effect observer
document.addEventListener("DOMContentLoaded", () => {
    animateOnScroll();
    observeTypingEffect();
});



