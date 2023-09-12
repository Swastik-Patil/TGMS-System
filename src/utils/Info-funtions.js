import { ref as dbref, child, get, update } from "firebase/database";
import { database } from "./init-firebase";

async function updateVisited() {
  const db = database;
  let data = 0;
  get(child(dbref(db), "/info/visited"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        data = snapshot.val();
      }
      let cnt = data;
      update(dbref(database, "/info/"), {
        visited: cnt + 1,
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

function updateRejected(path) {
  const db = database;
  let data = 0;
  //reducing pending and increasing rejected
  get(child(dbref(db), `/info/${path}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        data = snapshot.val();
        update(dbref(db, `/info/${path}/`), {
          pending: data.pending - 1,
          rejected: data.rejected + 1,
        });
        updateAllRejected();
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function updateAccepted(path) {
  const db = database;
  let data = 0;
  //reducing pending and increasing accepted
  get(child(dbref(db), `/info/${path}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        data = snapshot.val();
        update(dbref(db, `/info/${path}/`), {
          accepted: data.accepted + 1,
          pending: data.pending - 1,
        });
        updateAllAccepted();
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function updatePending(path) {
  const db = database;
  let data = 0;
  //updating pending
  get(child(dbref(db), `/info/${path}/pending`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        data = snapshot.val();
      }
      let cnt = data;
      update(dbref(db, `/info/${path}/`), {
        pending: cnt + 1,
      });
      updateAllPending();
    })
    .catch((error) => {
      console.error(error);
    });
}

function reducePending(path) {
  const db = database;
  let data = 0;
  //updating pending
  get(child(dbref(db), `/info/${path}/pending`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        data = snapshot.val();
      }
      let cnt = data;
      update(dbref(db, `/info/${path}/`), {
        pending: cnt - 1,
      });
      reduceAllPending();
    })
    .catch((error) => {
      console.error(error);
    });
}

function reduceAllPending() {
  const db = database;
  let data = 0;
  //updating pending
  get(child(dbref(db), `/info/all/pending`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        data = snapshot.val();
      }
      let cnt = data;
      update(dbref(db, `/info/all/`), {
        pending: cnt - 1,
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

function updateAllPending() {
  const db = database;
  let data = 0;
  //updating pending
  get(child(dbref(db), `/info/all/pending`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        data = snapshot.val();
      }
      let cnt = data;
      update(dbref(db, `/info/all/`), {
        pending: cnt + 1,
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

function updateAllAccepted() {
  const db = database;
  let data = 0;
  //reducing pending and increasing accepted
  get(child(dbref(db), `/info/all`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        data = snapshot.val();
        update(dbref(db, `/info/all/`), {
          accepted: data.accepted + 1,
          pending: data.pending - 1,
        });
      }
      window.location.href = "/HODPending";
    })
    .catch((error) => {
      console.error(error);
    });
}

function updateAllRejected() {
  const db = database;
  let data = 0;
  //reducing pendingn and increasing rejected
  get(child(dbref(db), `/info/all`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        data = snapshot.val();
        update(dbref(db, `/info/all/`), {
          pending: data.pending - 1,
          rejected: data.rejected + 1,
        });
      }
      window.location.href = "/HODPending";
    })
    .catch((error) => {
      console.error(error);
    });
}

//////////////// Getters ///////////////////////////////
function updateDashbaordDetails(path) {
  getVisited();
  const db = database;
  get(child(dbref(db), `/info/${path}/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        window.localStorage.setItem("accepted", data.accepted);
        window.localStorage.setItem("pending", data.pending);
        window.localStorage.setItem("rejected", data.rejected);
        window.location.href = "/dashboard";
        return data;
      } else return 0;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getVisited() {
  const db = database;
  let data = 0;
  get(child(dbref(db), "/info/visited"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        data = snapshot.val();
        window.localStorage.setItem("visited", data);
      } else {
        return 0;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export {
  updateVisited,
  updateRejected,
  updateAccepted,
  updatePending,
  reducePending,
  updateDashbaordDetails,
  getVisited,
};
