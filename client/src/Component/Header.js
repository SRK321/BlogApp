import "../StyleSheet/header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">WELCOME TO MY </span>
        <span className="headerTitleLg">BLOG</span>
      </div>
      <img
        className="headerImg"
        src="https://img.freepik.com/free-photo/alarm-clock-eyeglasses-laptop-with-coffee-cup-makeup-product-against-peach-backdrop_23-2148178659.jpg?w=1060&t=st=1691419251~exp=1691419851~hmac=c4e23863448bb59a94a1224be72b84c7615ec1480de217c11e26dc13f43fb284"
        alt=""
      />
    </div>
  );
}