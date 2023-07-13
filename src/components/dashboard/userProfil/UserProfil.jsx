import { useSelector } from "react-redux";
import { ProfilContainer, ProfilImage, UserData } from "./UserProfilStyles";

const UserProfil = () => {
  const user = useSelector((state) => state.auth);

  console.log(user);
  return (
    <ProfilContainer>
      <ProfilImage img={"https://picsum.photos/200/200"} />
      <UserData>
        <h3>{user && user.fullName}</h3>
        <p>{user && user.user.email}</p>
      </UserData>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta iste
        dignissimos cupiditate, commodi ex nihil? Tenetur, fugit nulla molestiae
        praesentium tempora officia commodi suscipit ipsam quae, magnam incidunt
        nostrum blanditiis.
      </p>
    </ProfilContainer>
  );
};

export default UserProfil;
