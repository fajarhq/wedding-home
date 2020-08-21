import "./App.css";
import React from "react";
import style from "./App.module.css";
import header from "./img/header.png";
import placeholder from "./img/placeholder.jpg";
import axios from "axios";
import moment from "moment";
import { Form } from "./component/form";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

class App extends React.Component {
  state = {
    mempelai: {},
    akad: {},
    resepsi: {},
    gallery: [],
    ucapan: [],
    keluarga_pria: {},
    keluarga_wanita: {},
    is_ucapan: false,
  };
  constructor() {
    super();
    api.get("/mempelai").then((res) => {
      const { data } = res.data;
      this.setState({ mempelai: data });
    });

    api.get("/akad").then((res) => {
      const { data } = res.data;
      this.setState({ akad: data });
    });
    api.get("/resepsi").then((res) => {
      const { data } = res.data;
      this.setState({ resepsi: data });
    });
    api.get("/gallery").then((res) => {
      const { data } = res.data;
      this.setState({ gallery: data });
    });
    api.get("/ucapan-selamat").then((res) => {
      const { data } = res.data;
      this.setState({ ucapan: data });
    });
    api.get("/keluarga-pria").then((res) => {
      const { data } = res.data;
      this.setState({ keluarga_pria: data });
    });
    api.get("/keluarga-wanita").then((res) => {
      const { data } = res.data;
      this.setState({ keluarga_wanita: data });
    });
  }

  render() {
    const {
      mempelai,
      akad,
      resepsi,
      gallery,
      ucapan,
      keluarga_pria,
      keluarga_wanita,
      is_ucapan,
    } = this.state;
    return (
      <div className={style.body}>
        <img className={style.header} src={header} alt="header" />
        <body>
          <div className={style.pengantin}>
            <div>
              <div>{mempelai.pria}</div>

              <div
                style={{
                  display: "flex",
                  fontSize: "13px",
                  justifyContent: "center",
                }}
              >
                <div>Putra dari Bapak {keluarga_pria.ayah}</div>
                <div>&nbsp; & &nbsp;</div>
                <div>Ibu {keluarga_pria.ibu}</div>
              </div>
            </div>
            &
            <div>
              <div>{mempelai.wanita}</div>

              <div
                style={{
                  display: "flex",
                  fontSize: "13px",
                  justifyContent: "center",
                }}
              >
                <div>Putra dari Bapak {keluarga_wanita.ayah}</div>
                <div>&nbsp; & &nbsp;</div>
                <div>Ibu {keluarga_wanita.ibu}</div>
              </div>
            </div>
            <div className={style.acara}>
              {moment(akad.tanggal).format("DD MMMM YYYY")}
            </div>
          </div>
          <div>
            <img className={style.front} src={placeholder} alt="placeholder" />
          </div>
          <div className={style.tagline}>Our Story</div>

          <div className={style.story}>{mempelai.story}</div>

          <div className={style.tagline}>Acara</div>
          <div></div>
          <div className={style.undangan}>
            <div className={style.akad}>
              Akad Nikah<br></br>
              {akad.tanggal}
              <br></br>
              {akad.jam}
              <br></br>
              {akad.lokasi}
            </div>
            <div className={style.akad}>
              Resepsi<br></br>
              {resepsi.tanggal}
              <br></br>
              {resepsi.jam}
              <br></br>
              {resepsi.lokasi}
            </div>
          </div>

          <div className={style.tagline}>Gallery of Love</div>
          <div>
            <div className={style.gallery}>
              {gallery.map((d, i) => {
                return (
                  <img
                    className={style.gallery}
                    src={`http://localhost:5000/${d.url}`}
                  />
                );
              })}
            </div>
          </div>

          <div className={style.tagline}>Ucapan</div>
          <div className={style.tagline01}>
            Doa dan ucapan dari teman semua sangatlah berarti bagi kami.
          </div>

          {ucapan.map((d, i) => {
            return (
              <div className={style.ucapanBox}>
                <div className={style["ucapanBox-title"]}>{d.user}</div>
                <div>{d.ucapan}</div>
              </div>
            );
          })}

          {!is_ucapan && (
            <Form
              validate={(values) => {
                let errors = {};
                if (!values.user) {
                  errors.user = "Required";
                }
                if (!values.ucapan) {
                  errors.ucapan = "Required";
                }

                return errors;
              }}
              initialValues={{}}
              onSubmit={(values, { setSubmitting }) => {
                const { user, ucapan } = values;
                api
                  .post("/edit/ucapan-selamat", {
                    user,
                    ucapan,
                  })
                  .then((res) => {
                    const { status } = res.data;
                    if (status === 200) {
                      this.setState((prevState) => ({
                        ucapan: [...prevState.ucapan, { user, ucapan }],
                        is_ucapan: true,
                      }));
                    }
                    setSubmitting(false);
                  })
                  .catch((err) => {
                    setSubmitting(false);
                  });
              }}
              render={({
                handleSubmit,
                errors,
                values,
                setFieldValue,
                handleChange,
                isSubmitting,
              }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <div style={{ textAlign: "center", marginTop: "50px" }}>
                      <div className={style.ucapan1}>
                        <div style={{ padding: "10px" }}> Nama</div>
                        <input
                          onChange={handleChange}
                          name="user"
                          style={{
                            padding: "10px",
                            borderRadius: "10px",
                            width: "30%",
                          }}
                          type="text"
                        ></input>
                        <br></br>
                      </div>

                      <div className={style.ucapan1}>
                        <div style={{ padding: "10px" }}> Ucapan</div>
                        <textarea
                          onChange={handleChange}
                          name="ucapan"
                          rows="4"
                          cols="50"
                          style={{ padding: "10px", borderRadius: "10px" }}
                          type="text"
                        ></textarea>
                      </div>
                      <div style={{ padding: "20px" }}>
                        <button type="submit" className={style.button}>
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                );
              }}
            />
          )}
          {is_ucapan && (
            <div style={{textAlign:"center"}} className={style.ucapan1}>
              <div style={{ padding: "10px" }}> Terimakasih</div>
            </div>
          )}
        </body>
      </div>
    );
  }
}

export default App;
