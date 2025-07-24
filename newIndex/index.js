window.addEventListener('scroll', () => {
    const bg = document.getElementById('mid');
    const overlay = document.querySelector('#mid > #overlay');
    const content = document.getElementById('content');

    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    const scrollProgress = Math.min(1, scrollY / maxScroll); // value between 0 and 1
    const moveX = scrollProgress * 60;
    const moveGradient = scrollProgress * 500;
    const moveOverlay = scrollProgress*60*3

    bg.style.transform = `translateX(${-moveX}vw) skewX(-10deg)`;
    // bg.style.background = `linear-gradient(
    //     #80D39B ${0-moveGradient}%,
    //     #6E8894 ${500-moveGradient}%
    // )`;

    overlay.style.transform = `translateY(${moveOverlay}vh)`;

    content.style.transform = `translateX(${scrollY * 0.035 * Math.sin(-10)}vw) skewX(-10deg)`
});


const items = [
    {   title: "3d Renderer",
        subtitle: "",
        description: "A 3d renderer I made from scratch only using javascript. it can render obj files",
        image: "Z-images/Renderer.png",
        link: {
            text: "View now",
            url: "Renderer1/",
        },
        index: 5,
        show: true,
    },
    {   title: "RUN",
        subtitle: "",
        description: "A prototype of my copy of the RUN game using css and js",
        image: "Z-images/run.png",
        link: {
            text: "Play [prototype] now",
            url: "run/",
        },
        index: 9,
        show: false,
    },
    {   title: "8bit-bird5",
        subtitle: "",
        description: "A local multiplayer pygame game with shaders to give it a retro look",
        image: "Z-images/8bb-cover.png",
        link: {
            text: "Download now",
            url: "8bb/",
        },
        index: 4,
        show: true,
    },
    {   title: "Asteroids2",
        subtitle: "",
        description: "A simple arcade game where you dodge Asteroids and try to beat the highscore.",
        image: "Z-images/asteroids2.png",
        link: {
            text: "Play now",
            url: "asteroids2/",
        },
        index: 1,
        show: true,
    },
    {   title: "Shape Game",
        subtitle: "",
        description: "Topdown shooter made in pygame with enemy ai, upgrades, multiple bossfights and modes",
        image: "Z-images/coverimg.png",
        link: {
            text: "Play now",
            url: "shapegame/",
        },
        index: 3,
        show: true,
    },
    {   title: "Golf",
        subtitle: "",
        description: "4 player local multiplayer mini golf game using a single input each",
        image: "Z-images/Golf.png",
        link: {
            text: "Play now",
            url: "golf/",
        },
        index: 7,
        show: false,
    },
    {   title: "Dots",
        subtitle: "",
        description: "A 3d horror game where you can only see dots from your flashlight",
        image: "Z-images/dots.png",
        link: {
            text: "Play now",
            url: "dots/",
        },
        index: 2,
        show: false,
    },
    {   title: "Radar Game",
        subtitle: "",
        description: "A submarine game made with css and js, where you controll the radar and shooting",
        image: "Z-images/radar.png",
        link: {
            text: "Play [prototype] now",
            url: "radarGame/",
        },
        index: 8,
        show: false,
    },
    {   title: "2dCollision",
        subtitle: "",
        description: "2d ball simulation made with pygame [left click] move, [right click] throw",
        image: "Z-images/2dcollisions.png",
        link: {
            text: "View now",
            url: "2dcollisions/",
        },
        index: 6,
        show: false,
    }
];

document.addEventListener('DOMContentLoaded', () => {

    const content = document.getElementById('content');

    for (const item of items) {
        const container = document.createElement('div');
        container.id = 'container';

        const textDiv = document.createElement('div');
        textDiv.id = 'text';

        const h2 = document.createElement('h2');
        h2.textContent = item.title;

        const h3 = document.createElement('h3');
        h3.textContent = item.subtitle;

        const p = document.createElement('p');
        p.textContent = item.description;

        const a = document.createElement('a');
        a.href = item.link.url;
        a.textContent = item.link.text;
        
        textDiv.appendChild(h2);
        textDiv.appendChild(h3);
        textDiv.appendChild(p);
        textDiv.appendChild(a);

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.title;

        container.appendChild(textDiv);
        container.appendChild(img);

        content.appendChild(container);
    }
    
});