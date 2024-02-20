export default function CheckAuthorization() {
  let usertype = window.localStorage.getItem("usertype");
  if (usertype === "Teacher Guardian") {
    window.location.href = "/TGHome";
  }
  if (usertype === "Teacher Guardian Coordinator") {
    window.location.href = "/TGCHome";
  }
  if (usertype === "Class Coordinator") {
    window.location.href = "/CCHome";
  }
  if (usertype === "Admin") {
    window.location.href = "/AdminHome";
  }
  if (usertype === "Select an option") {
    window.location.href = "/home";
  }
}
