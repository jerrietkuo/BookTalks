document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display comments
    fetch('comments.txt')
        .then(response => response.text())
        .then(data => {
            const commentsPane = document.getElementById('comments-pane');
            const comments = data.split('\n');
            comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment';
                commentDiv.textContent = comment;
                commentsPane.appendChild(commentDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
        });

    // Fetch and display trending topics
    fetch('community.txt')
        .then(response => response.text())
        .then(data => {
            const commentsPane = document.getElementById('topics-pane');
            const comments = data.split('\n');
            comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment';
                commentDiv.textContent = comment;
                commentsPane.appendChild(commentDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
        });

    // Fetch and display notifications
    fetch('notifications.txt')
        .then(response => response.text())
        .then(data => {
            const notificationsContainer = document.getElementById('notifications-container');
            const notifications = data.split('\n');
            notifications.forEach(notification => {
                const notificationDiv = document.createElement('div');
                notificationDiv.className = 'notification-item';
                notificationDiv.textContent = notification;
                notificationsContainer.appendChild(notificationDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching notifications:', error);
        });

    fetch('topics.json')
    .then(response => response.json())
    .then(data => {
        const topicsContainer = document.getElementById('topics-container');
        data.forEach(topic => {
            const topicDiv = document.createElement('div');
            topicDiv.className = 'topic-item';

            const metaDiv = document.createElement('div');
            metaDiv.className = 'meta';
            metaDiv.textContent = `${topic.date} by ${topic.username}`;

            const subjectH3 = document.createElement('h3');
            subjectH3.textContent = topic.subject;

            const contentP = document.createElement('p');
            contentP.textContent = topic.content;

            topicDiv.appendChild(metaDiv);
            topicDiv.appendChild(subjectH3);
            topicDiv.appendChild(contentP);

            topicsContainer.appendChild(topicDiv);
        });
    })
    .catch(error => {
        console.error('Error fetching topics:', error);
    });

    // Fetch and display user profile
    fetch('user.json')
        .then(response => response.json())
        .then(data => {
            const profileContainer = document.getElementById('profile-container');

            const profileInfoDiv = document.createElement('div');
            profileInfoDiv.className = 'profile-info';

            const usernameH3 = document.createElement('h3');
            usernameH3.textContent = data.username;

            const bioP = document.createElement('p');
            bioP.textContent = `Bio: ${data.bio}`;

            const joinedP = document.createElement('p');
            joinedP.textContent = `Joined: ${data.joined}`;

            profileInfoDiv.appendChild(usernameH3);
            profileInfoDiv.appendChild(bioP);
            profileInfoDiv.appendChild(joinedP);

            profileContainer.appendChild(profileInfoDiv);

            const sections = [
                { title: 'Favorite Books', key: 'favoriteBooks' },
                { title: 'Last 5 Books Read', key: 'lastRead' },
                { title: 'Last 5 Books Reviewed', key: 'lastReviewed' },
                { title: 'Books To Be Read', key: 'toBeRead' },
                { title: 'Friend Recommendations', key: 'recommendations' }
            ];

            sections.forEach(section => {
                const sectionDiv = document.createElement('div');
                sectionDiv.className = 'profile-section';

                const sectionTitleH3 = document.createElement('h3');
                sectionTitleH3.textContent = section.title;

                const booksGridDiv = document.createElement('div');
                booksGridDiv.className = 'profile-books-grid';

                data[section.key].forEach(book => {
                    const bookDiv = document.createElement('div');
                    bookDiv.className = 'book';
                    bookDiv.textContent = book;
                    booksGridDiv.appendChild(bookDiv);
                });

                sectionDiv.appendChild(sectionTitleH3);
                sectionDiv.appendChild(booksGridDiv);

                profileContainer.appendChild(sectionDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching user profile:', error);
        });  m




















});

document.addEventListener('DOMContentLoaded', () => {
    const imageContainers = document.querySelectorAll('.image-container');

    imageContainers.forEach(container => {
        const image = container.querySelector('img');
        const flipped = container.querySelector('.flipped');

        container.addEventListener('click', () => {
            if (image.classList.contains('flipped-front')) {
                image.classList.remove('flipped-front');
                flipped.classList.remove('flipped-back');
            } else {
                image.classList.add('flipped-front');
                flipped.classList.add('flipped-back');
            }
        });
    });
});