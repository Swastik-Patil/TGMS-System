import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getDatabase, ref as Ref, child, get } from "firebase/database";
import CertificateImage from "../res/certificate.png";
import Header from "../components/Header";

export default function UploadedCertificates({ data }) {
  const [files, setFiles] = useState(null);
  const { currentUser } = useAuth();

  function getData() {
    if (!data) return;
    let d = data.filter((ele) => {
      return ele.email === currentUser.email;
    });
    const dbRef = Ref(getDatabase());
    get(child(dbRef, "/StudentsData/" + d[0].admissionNo + "/certificateList/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          data = Object.keys(data).map((key) => {
            return data[key];
          });
          setFiles(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getData();
  });

  const navItems = [
    {
      label: "Upload Certificates",
      href: "uploadCertificate",
    },
    {
      label: "Uploaded Certificates",
      href: "uploadedCertificates",
    },
  ];

  return (
    <>
      <Header navItems={navItems} />
      {files ? (
        files.map((file, index) => {
          return (
            <div className="py-4" key={index}>
              <div className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-small uppercase font-bold">{file.name}</p>
                <small className="text-default-400">Accomplishment Date</small>
                <h4 className="font-bold text-large">Certificate Title</h4>
              </div>
              <div className="overflow-visible py-2">
                <img
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={CertificateImage}
                  width={270}
                />
              </div>
              <div>
                <div>
                  <a
                    href={file.downloadURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {file.name}
                  </a>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>No Uploaded Documents</div>
      )}
    </>
  );
}
