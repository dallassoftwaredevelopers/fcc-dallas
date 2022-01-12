import * as React from "react";
import { useLocation } from "remix";
import Divider from "~/library/components/Divider";
import { applyIfTrue, isDefined } from "~/utils";

const HamburgerMenu: React.FC = ({ children }) => {
  const [isOpen, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const location = useLocation();

  React.useEffect(() => {
    setOpen(false);
  }, [location]);

  React.useEffect(() => {
    const mouseUpCb = (e: MouseEvent) => clickOff(e.target as HTMLElement);
    const resizeCb = () => setOpen(false);
    window.addEventListener("mouseup", mouseUpCb);
    window.addEventListener("resize", resizeCb);

    return () => {
      window.removeEventListener("mouseup", mouseUpCb);
      window.removeEventListener("resize", resizeCb);
    };
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflowY = "initial";
    }
  }, [isOpen]);

  const clickOff = (clickedEl: HTMLElement) => {
    if (!isDefined(menuRef.current) || !isDefined(drawerRef.current)) {
      setOpen(false);
      return;
    }
    if (
      menuRef.current.contains(clickedEl) ||
      drawerRef.current.contains(clickedEl)
    ) {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <div
        ref={menuRef}
        className={`hamburger-menu ${applyIfTrue(isOpen, "hamburger-open")}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className={`hamburger-line line1`} />
        <div className={`hamburger-line line2`} />
        <div className={`hamburger-line line3`} />
      </div>

      <div
        ref={drawerRef}
        className={`hamburger-drawer ${applyIfTrue(
          isOpen,
          "hamburger-drawer-open"
        )}`}
      >
        <img
          src="/img/fcc-logo.png"
          alt="fcc logo"
          style={{ marginTop: "2.5rem", maxWidth: "225px" }}
        />
        <Divider white />
        {children}
      </div>
    </>
  );
};

export default HamburgerMenu;
