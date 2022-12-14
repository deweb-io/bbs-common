import Firestore from '@google-cloud/firestore';

let db = null;

export async function initalize() {
    if (db !== null) { 
        console.log('DB already initalized: ', db)
        return;
    }

    db = new Firestore({
        projectId: 'creator-eco-stage',
        keyFilename: './creatorEcoStageKey.json',
    });

    console.log('DB initalized: ', db)
}

export async function getPostById(id) {
    if (db == null) {
        await initalize();
    }

    const postRef = await db.collection('Post').doc(id);
    const post = await postRef.get();
    if (!post.exists) {
        console.log('No such document!');
    }   else {
        console.log('Document data:', post.data());
        return post.data();
    }
}