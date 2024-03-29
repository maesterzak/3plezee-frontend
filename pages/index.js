import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  useTheme,
  Text,
  Grid,
  Spacer,
  Card,
  Col,
  Input,
  Container,
  Loading,
  StyledLoadingContainer,
  Textarea,
} from "@nextui-org/react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import { useMediaQuery } from "../components/mediaQuery";
import ShopCard from "../components/ShopCard";
import CategoryCard from "../components/CategoriesCard";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button1 from "../components/Buttons/Button1";
import Footer from "../components/Footer";
import Button2 from "../components/Buttons/Button2";
import { MyStyledButton } from "../components/Buttons/myStyledButton";
const AutoplaySlider = withAutoplay(AwesomeSlider);
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LatestProducts } from "../utils/data";
import { Categoryitems } from "../utils/data";
import { InstagramPics } from "../utils/data";
import Link from "next/link";

export default function Home() {
  const { isDark } = useTheme();
  const [latestPFilter, setLatestPFilter] = useState(undefined);
  const [categories, setCategories] = useState(undefined);
  const [products, setProducts] = useState(undefined);
  const [latestproducts, setLatestProducts] = useState(undefined);
  const getCategories = async () => {
    let res = await fetch("/api/categories/categories", {
      method: "GET",
    });
    let response = await res.json();

    if (res.ok) {
      setCategories(response.data);
    } else {
      toast(" Failed to get categories", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: isDark ? "dark" : "light",
      });
    }
  };

  const getProducts = async () => {
    let res = await fetch("/api/products/products/", {
      method: "GET",
    });
    let response = await res.json();

    if (res.ok) {
      setProducts(response.data);
    } else {
      toast(" Failed to get products", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: isDark ? "dark" : "light",
      });
    }
  };

  const getLatestProducts = async () => {
    let res = await fetch("/api/products/latest-products", {
      method: "GET",
    });
    let response = await res.json();

    if (res.ok) {
      setLatestProducts(response.data);
    } else {
      toast(" Failed to get products", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: isDark ? "dark" : "light",
      });
    }
  };

  useEffect(() => {
    getCategories();
    getLatestProducts();
    getProducts();
  }, []);

  const addMessage = async (params) => {
    let res = await fetch("/api/contact-us/", {
      method: "POST",

      body: JSON.stringify(params),
    });
    let response = await res.json();
    if (res.ok) {
      toast.success("Message added", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: isDark ? "dark" : "light",
      });
      return true;
    } else {
      toast.error(" Failed to add message", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: isDark ? "dark" : "light",
      });
      return false;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    var formData = new FormData(e.target);

    const form_values = Object.fromEntries(formData);
    let u = addMessage(form_values);
    if (u) {
      e.target.reset();
    }
  };
  const isMd = useMediaQuery(760);
  const { theme } = useTheme();
  const SecondMain = {
    image:
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGZhc2hpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  };

  return (
    <div>
      <main className={styles.main}>
        <AutoplaySlider
          play={true}
          cancelOnInteraction={false} // should stop playing on user interaction
          interval={6000}
        >
          <div data-src="/images/category-banner.jpg" />
          <div data-src="/images/second.jpg" />
          <div data-src="/images/third.jpg" />
        </AutoplaySlider>
        <Spacer />

        <Container
          css={{ paddingTop: "40px", maxWidth: "1504px", margin: 0 }}
          fluid
        >
          <Grid.Container id="categories" gap={2}>
            {categories?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <CategoryCard mq={isMd} item={item} />
                </React.Fragment>
              );
            })}

            {!categories && (
              <div className="d-flex justify-content-center align-items-center">
                <Loading />
              </div>
            )}
          </Grid.Container>

          <Spacer />
          <Spacer />
          <Spacer />
          <br />
          <Grid className="d-grid justify-content-center" direction={"row"}>
            <Text
              b
              id="latest-products"
              className="text-center"
              css={{ letterSpacing: isMd ? "3px" : "8px" }}
              h3
            >
              OUR PRODUCTS
            </Text>
            {/* <Image
          src='/svg/filter.svg'
            width={40}
            height={40}
          alt=''
          /> */}
          </Grid>
          <Spacer />

          <div
            className="row g-0"
          // direction={isMd ? "column" : "row"}
          // css={{ maxWidth: "100vw", flexWrap: "wrap" }}
          // gap={1}
          >
            {latestproducts?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <ShopCard mq={isMd} item={item} cardCount={4} />
                </React.Fragment>
              );
            })}
            {!latestproducts && (
              <div className="d-flex justify-content-center align-items-center">
                <Loading />
              </div>
            )}
          </div>

          <Spacer />
          <div className="d-flex justify-content-center">
            <Button2 text={"Load more"} />
          </div>
          <Spacer />

          <Spacer />

          <Spacer />
          {/* <Grid className="d-grid justify-content-center" direction={"row"}>
            <Text
              css={{ letterSpacing: isMd ? "4px" : "8px" }}
              id="our-products"
              h3
              b
            >
              OUR PRODUCTS
            </Text>
            <Image
          src='/svg/filter-active.svg'
            width={60}
            height={60}
          alt=''
          />
          </Grid> */}

          {/* <Grid.Container
            css={{ display: "flex", justifyContent: "center", gap: "2px" }}
          >
            <div className="our_products_buttons">
              <button className="active_btn btn">All</button>
              <button className="btn h-100 p-0">Top rated</button>
              <button className="btn" disabled>
                Featured
              </button>
            </div>
          </Grid.Container> */}
          <Spacer />
          <Spacer />

          {/* <Grid.Container
            
            gap={1}
          >
            {products?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <ShopCard mq={isMd} item={item} cardCount={3} />
                </React.Fragment>
              );
            })}

            {!products && (
              <div className="d-flex justify-content-center align-items-center">
                <Loading />
              </div>
            )}
          </Grid.Container> */}
          {/* <Spacer />
          <div className="d-flex justify-content-center">
            <Button2 text={"Load more"} />
          </div>
          <Spacer />

          <Spacer /> */}
        </Container>
        <Link href={'https://instagram.com/3plezee_trendyemporium?igshid=YmMyMTA2M2Y='} className="">
          <Text css={{ letterSpacing: isMd ? "1px" : "8px" }} h3>
            FOLLOW US ON INSTAGRAM</Text>
        </Link>
        <Spacer />
        <Grid.Container>
          {InstagramPics.map((item, index) => {
            return (
              <Grid key={index} xs={isMd ? 4 : 2}>
                <Card
                  variant={"shadow"}
                  isHoverable
                  isPressable
                  css={{ minHeight: "150px", borderRadius: "unset" }}
                >
                  <Card.Image
                    src={item.image}
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    alt="Card example background"
                  ></Card.Image>
                </Card>
              </Grid>
            );
          })}
          <span id="about"></span>
          <Grid
            xs={12}
            css={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card.Image
              css={{
                maxHeight: "70vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "50vh",
              }}
              src={
                "https://cdn.shopify.com/s/files/1/0437/1913/1293/files/store-baner-if_2450x.jpg?v=1613697029"
              }
              width="100%"
              height="100%"
              objectFit="cover"
              alt="Card example background"
            ></Card.Image>

            <Card
              className="p-4"
              css={{
                position: "absolute",
                width: isMd ? "80%" : "70%",
                // height: "300px",
                background: "rgba(181, 150, 119, 0.8)",
                textAlign: "center",
              }}
            >
              <Col
                css={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text
                  css={{
                    fontSize: "x-large",
                    letterSpacing: "15px",
                    padding: 0,
                  }}
                  weight="bold"
                  color="#ffffff"
                  transform="uppercase"
                >
                  3PLEZEE
                </Text>
                <Text
                  className="m-0 p-0"
                  css={{ fontSize: "large" }}
                  color="#ffffff"
                >
                  Plot 579 Peace Village Market Lugbe, Abuja.
                </Text>

                <Text
                  className="m-0 p-0"
                  css={{ fontSize: "x-large" }}
                  color="white"
                >
                  _______________
                </Text>
                <Text b className="m-0 p-0" color="#ffffff">
                  Opening Hours
                </Text>
                <Text color="#ffffff">
                  Mondays to Saturdays : 9:00am - 8:00pm
                  <br />
                  Sundays : Closed
                </Text>
              </Col>
            </Card>

            <span id="contact"></span>
          </Grid>
        </Grid.Container>

        <Grid.Container className="p-4">
          <Grid className="p-3" direction="column" xs={isMd ? 12 : 6}>
            <Text h4>DROP US A LINE</Text>

            <form onSubmit={submitHandler} className="row">
              <div className="col-12 mt-1 mb-1">
                <label style={{ color: "var(--nextui-colors-text)" }}>
                  Name
                </label>
                <Input
                  name="name"
                  required
                  css={{ width: "100%" }}
                  type={"text"}
                  placeholder="Name"
                />
              </div>

              <div className="col-12 mt-1 mb-1">
                <label style={{ color: "var(--nextui-colors-text)" }}>
                  Email
                </label>
                <Input
                  name="email"
                  required
                  css={{ width: "100%" }}
                  type={"email"}
                  placeholder="Email"
                />
              </div>

              <div className="col-12 mt-1 mb-1">
                <label style={{ color: "var(--nextui-colors-text)" }}>
                  Phone Number
                </label>
                <Input
                  name="phone_number"
                  required
                  css={{ width: "100%" }}
                  type={"text"}
                  placeholder="Phone Number "
                />
              </div>

              <div className="col-12 mt-1 mb-1 d-grid">
                <label style={{ color: "var(--nextui-colors-text)" }}>
                  Message
                </label>
                <Textarea name="message"></Textarea>
                <Spacer />
                <MyStyledButton
                  type={"submit"}
                  // disabled= {params.disabled ?? false}
                  auto
                  css={{ height: "30px", width: "100%", fontSize: "auto" }}
                  size="mysize"
                  color="mycolor"
                >
                  SEND
                </MyStyledButton>
              </div>
            </form>
          </Grid>
          <Grid className="p-3" direction="column" xs={isMd ? 12 : 6}>
            <Text h4>CONTACT INFORMATION</Text>
            <Text>
              We love to hear from you on our customer service, merchandise,
              website or any topics you want to share with us. Your comments and
              suggestions will be appreciated. Please complete the form below.
            </Text>

            <Spacer />
            <div className="d-flex gap-2 align-item-center">
              <div className="b-danger">
                <Image
                  src="/svg/map-light.svg"
                  width="50"
                  alt=""
                  height={"50"}
                />
              </div>
              <Text> Plot 579 Peace Village Market Lugbe, Abuja.</Text>
            </div>

            <Spacer />
            <div className="d-flex gap-2 align-item-center">
              <div>
                <Image
                  src="/svg/phone-light.svg"
                  width={"50"}
                  alt=""
                  height={"40"}
                />
              </div>
              <Text> 08165817236</Text>
            </div>

            <Spacer />
            <div className="d-flex gap-2 align-item-center">
              <div>
                <Image
                  src="/svg/email-light.svg"
                  width="40"
                  alt=""
                  height={"40"}
                />
              </div>
              <Text> 3plezee.emporium@gmail.com</Text>
            </div>

            <Spacer />
            <div className="d-flex gap-2 align-item-center">
              <div>
                <Image src="/svg/clock.svg" width="40" alt="" height={"40"} />
              </div>
              <Text> Mon-Sun 9:00am-8:00pm</Text>
            </div>
          </Grid>
        </Grid.Container>
      </main>

      {/* <style jsx global>{`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: Lobster;
  }

  * {
    box-sizing: border-box;
  }
`}</style> */}
      <div style={{ position: "fixed", bottom: isMd ? "55px" : "20px", right: isMd ? "20px" : "20px" }}>
        <Link href={'https://instagram.com/3plezee_trendyemporium?igshid=YmMyMTA2M2Y='}>
          <div className="social-link-wrapper">
            <Image width={40} height={40} src={'/images/instagram.svg'} />
          </div>
        </Link>
      </div>
    </div>
  );
}
