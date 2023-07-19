import { useSelector } from "react-redux";

import {
  ProfilContainer,
  ProfilImage,
  UserData,
  UserNoDesc,
  UserDesc,
} from "./UserProfilStyles";
const UserProfil = () => {
  const user = useSelector((state) => state.auth);
  console.log(user)
  console.log(user.fullName)
  return (
    <>
      <ProfilContainer>
        <ProfilImage img={"https://picsum.photos/200/200"} />
        <UserData>
          <h3>{user && user.fullName}</h3>
          <p>{user && user.email}</p>
          <p>{user && user.date}</p>
        </UserData>
        {user.description ? (
          <UserDesc>
            <p>{user.description}</p>
          </UserDesc>
        ) : (
          <UserNoDesc>
            <p>You can add your description down below</p>
          </UserNoDesc>
        )}
      </ProfilContainer>
    </>
  );
};

export default UserProfil;
