import firebase from 'firebase';
import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USERS_DATA_STATE_CHANGE } from '../constants/index';

export function fetchUser(){
    return((dispatch) => {
        firebase.firestore()
        .collection('user')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then(( snapshot ) => {
            if(snapshot.exists){
                dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
            }
            else {
                console.log('User Does Not Exist')
            }
        })
    })
}
export function fetchUserPosts(){
    return((dispatch) => {
        firebase.firestore()
        .collection('posts')
        .doc(firebase.auth().currentUser.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then(( snapshot ) => {
            let posts = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return {id, ...data}
            })
            dispatch({ type: USER_POSTS_STATE_CHANGE, posts })
        })
    })
}

export function fetchUsersData(uid) {
    return((dispatch, getState) => {
        const found = getState().usersState.some(el => el.uid === uid);
        if(!found){
        firebase.firestore()
        .collection('users')
        .doc(uid)
        .get()
        .then(( snapshot ) => {
            if (snapshot.exists) {
                let user = snapshot.data();
                user.uid = snapshot.id;
                dispatch({ type: USERS_DATA_STATE_CHANGE, user })
            }
        })
        }
    })
}

export function fetchUsersFollowingPosts(uid) {
    return ((dispatch, getState) => {
        firebase.firestore()
            .collection("posts")
            .doc(uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                const uid = snapshot.query.EP.path.segments[1];
                const user = getState().usersState.users.find(el => el.uid === uid);
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data, user }
                })
                for(let i = 0; i< posts.length; i++){
                    dispatch(fetchUsersFollowingLikes(uid, posts[i].id))
                }
                dispatch({ type: USERS_POSTS_STATE_CHANGE, posts, uid })
            })
    })
}

export function fetchUsersFollowing(uid) {
    return((dispatch, getState) => {
        firebase.firestore()
        .collection('posts')
        .doc(uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then(( snapshot ) => {
            const uid = snapshot.query.EP.path.segments[1]
            // console.log(snapshot, uid)
            const user = getState().usersState.user.find(el => el.uid === uid);

            let posts = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data, user }
            })
            dispatch({ type: USERS_POSTS_STATE_CHANGE, posts })
            for(let i = 0; i <fetchUsersFollowing.length; i++){
                dispatch(fetchUsersData(following[i]));
            }
        })
    })
}