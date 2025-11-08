import styled from "styled-components";
import { LinksArray, SecondarylinksArray } from "../../utils/dataEstatica";
import { ToggleTema } from "./ToggleTema";
import { NavLink } from "react-router-dom";
import { v } from "../../styles/variables";
import { useState } from "react";

export function MenuHambur() {
  const [click, setClick] = useState(false);
  return (
    <Container>
      <NavBar>
        <section>
          <HamburgerMenu onClick={() => setClick(!click)}>
            <label
              className={click ? "hamburger-label active" : "hamburger-label"}
              htmlFor="label-check"
            >
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
              <label></label>
            </label>
          </HamburgerMenu>
        </section>
        <Menu $click={click.toString()}>
          {LinksArray.map(({ icon, label, to }) => (
            <div
              onClick={() => setClick(!click)}
              className="LinkContainer"
              key={label}
            >
              <NavLink to={to} className="Links">
                <div className="Linkicon">{icon}</div>
                <span>{label}</span>
              </NavLink>
            </div>
          ))}
          <Divider />
          {SecondarylinksArray.map(({ icon, label, to }) => (
            <div
              onClick={() => setClick(!click)}
              className="LinkContainer"
              key={label}
            >
              <NavLink to={to} className="Links">
                <div className="Linkicon">{icon}</div>
                <span>{label}</span>
              </NavLink>
            </div>
          ))}
          <ToggleTema />
          <Divider />
        </Menu>
      </NavBar>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${(props) => props.theme.body};
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
`;

const HamburgerMenu = styled.span`
  position: fixed;
  top: 2rem;
  z-index: 100;
  /* From Uiverse.io by JkHuger */
  .label-check {
    display: none;
  }

  .hamburger-label {
    width: 70px;
    height: 58px;
    display: block;
    cursor: pointer;
    &.active {
      .line1 {
        transform: rotate(35deg) scaleX(0.55) translate(39px, -4.5px);
        border-radius: 50px 50px 50px 0;
      }
      .line3 {
        transform: rotate(-35deg) scaleX(0.55) translate(39px, 4.5px);
        border-radius: 0 50px 50px 50px;
      }
      .line2 {
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
        width: 45px;
      }
    }
  }

  .hamburger-label div {
    width: 70px;
    height: 6px;
    background-color: ${({theme})=>theme.text};
    position: absolute;
  }

  .line1 {
    transition: all 0.3s;
  }

  .line2 {
    margin: 18px 0 0 0;
    transition: 0.3s;
  }

  .line3 {
    margin: 36px 0 0 0;
    transition: 0.3s;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  z-index: 10;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  background-color: ${(props) => `rgba(${props.theme.bodyRgba},0.85)`};
  backdrop-filter: blur(3px);
  transform: ${(props) =>
    props.$click == "true" ? "translateY(0)" : "translateY(1000%)"};
  transition: all 0.3s ease;

  .LinkContainer {
    &:hover {
      background: ${(props) => props.theme.bgAlpha};
    }
    .Links {
      width: 100vw;
      display: flex;
      align-items: center;
      text-decoration: none;
      color: ${(props) => props.theme.text};
      height: 80px;
      .Linkicon {
        padding: ${v.smSpacing} ${v.mdSpacing};
        display: flex;
        svg {
          font-size: 25px;
        }
      }
    }
  }
`;
const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.bg4};
  margin: ${() => v.lgSpacing} 0;
`;
