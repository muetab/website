import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import Head from "../components/Head";

//import Banner from "../components/Banner";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Press from "../components/home/Press";
import Feature from "../components/home/Feature";

import GetStarted from "../components/GetStarted";

import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";

import getBrowser from "../modules/getBrowser";

import Carousel from "../components/home/Carousel";

export async function getServerSideProps(context) {
  const data = getBrowser(context.req.headers["user-agent"]);
  return {
    props: {
      data,
      ...(await serverSideTranslations(context.locale, [
        "home",
        "navbar",
        "footer",
        "getstarted",
      ])),
    },
  };
}

export default function Home(props) {
  const { t } = useTranslation("home");

  return (
    <>
      <Head title={t("title")} />
      {/* <Banner /> */}
      <header>
        <div className="promotion">
          <div>
            <span>
              {t("promotion.title")}
              <Typewriter
                words={[
                  t("promotion.productive"),
                  t("promotion.inspired"),
                  t("promotion.organised"),
                  t("promotion.yourself"),
                ]}
                loop={0}
                delaySpeed={2500}
              />
            </span>
            <br />
            <span className="two">{t("promotion.subtitle")}</span>
          </div>
          <div className="buttons">
            <Link href={props.data.link}>
              <a>
                <button className="filled">
                  {props.data.text}
                  <MdOutlineKeyboardArrowRight />
                </button>
              </a>
            </Link>
            <Link href="https://demo.muetab.com">
              <a className="hollow">
                {t("promotion.demo")}
                <MdOutlineKeyboardArrowRight />
              </a>
            </Link>
          </div>
        </div>
      </header>
      <Navbar />
      <div style={{ marginTop: "500pt" }} className="content">
        <div className="features">
          <Feature
            name="widgets"
            title={t("features.widgets.title")}
            image="https://res.cloudinary.com/mue/image/upload/v1639307577/website/widgets.svg"
            description={t("features.widgets.description")}
          />
          <Feature
            reverse
            name="opensource"
            title={t("features.opensource.title")}
            image="https://res.cloudinary.com/mue/image/upload/v1639307577/website/opensource.svg"
            description={t("features.opensource.description")}
            link="https://github.com/mue"
            linkText={t("features.opensource.link")}
          />
          <Feature
            name="privacy"
            title={t("features.privacy.title")}
            image="https://res.cloudinary.com/mue/image/upload/v1639307577/website/privacy.svg"
            description={t("features.privacy.description")}
            link="/privacy"
            linkText={t("features.privacy.link")}
          />
          <Feature
            reverse
            name="marketplace"
            title={t("features.extensible.title")}
            image="https://res.cloudinary.com/mue/image/upload/v1639307577/website/marketplace.svg"
            description={t("features.extensible.description")}
          />
        </div>
      </div>
      <div className="shareyourmue">
        <div className="content">
          <span>
            {t("shareyourmue.title")}
            <Typewriter
              words={[
                t("shareyourmue.work"),
                t("shareyourmue.students"),
                t("shareyourmue.productivity"),
                t("shareyourmue.fun"),
                t("shareyourmue.everyone"),
              ]}
              loop={0}
              delaySpeed={2500}
            />
          </span>
          <p>
            {t("shareyourmue.description_start")} <b>#shareyourmue</b>{" "}
            {t("shareyourmue.description_end")}
          </p>
          <Carousel />
        </div>
      </div>
      <div className="press">
        <div className="content">
          <h1>{t("press")}</h1>
          <Press />
        </div>
      </div>
      <GetStarted />
      <Footer />
    </>
  );
}