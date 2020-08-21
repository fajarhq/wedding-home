import "./App.css";
import React from "react";
import { Form } from "./component/form";
import { FieldArray } from "formik";
import FileInput from "./component/FileInput";
import Image from "./component/Image";
import style from "./Edit.module.css";

import axios from "axios";
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
    add_gallery: [],
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
      gallery,
      add_gallery,
      mempelai,
      akad,
      resepsi,
      keluarga_pria,
      keluarga_wanita,
      ucapan,
    } = this.state;
    return (
      <div className={style.body}>
        <div className={style.headerTitle}>Edit Form</div>

        <Form
          enableReinitialize
          validate={(values) => {
            let errors = {};
            if (!values.pengantin_pria) {
              errors.pengantin_pria = "Required";
            }
            if (!values.pengantin_wanita) {
              errors.pengantin_wanita = "Required";
            }
            if (!values.story) {
              errors.story = "Required";
            }
            if (!values.lokasi_akad) {
              errors.lokasi_akad = "Required";
            }
            if (!values.tanggal_akad) {
              errors.tanggal_akad = "Required";
            }
            if (!values.jam_akad) {
              errors.jam_akad = "Required";
            }
            if (!values.lokasi_resepsi) {
              errors.lokasi_resepsi = "Required";
            }
            if (!values.tanggal_resepsi) {
              errors.tanggal_resepsi = "Required";
            }
            if (!values.jam_resepsi) {
              errors.jam_resepsi = "Required";
            }
            if (!values.keluarga_pria_ayah) {
              errors.keluarga_pria_ayah = "Required";
            }
            if (!values.keluarga_pria_ibu) {
              errors.keluarga_pria_ibu = "Required";
            }
            if (!values.keluarga_wanita_ayah) {
              errors.keluarga_wanita_ayah = "Required";
            }
            if (!values.keluarga_wanita_ibu) {
              errors.keluarga_wanita_ibu = "Required";
            }

            return errors;
          }}
          initialValues={{
            add_gallery: [],
            pengantin_pria: mempelai.pria,
            pengantin_wanita: mempelai.wanita,
            story: mempelai.story,
            lokasi_akad: akad.lokasi,
            tanggal_akad: akad.tanggal,
            jam_akad: akad.jam,
            lokasi_resepsi: resepsi.lokasi,
            tanggal_resepsi: resepsi.tanggal,
            jam_resepsi: resepsi.jam,
            keluarga_pria_ayah: keluarga_pria.ayah,
            keluarga_pria_ibu: keluarga_pria.ibu,
            keluarga_wanita_ayah: keluarga_wanita.ayah,
            keluarga_wanita_ibu: keluarga_wanita.ibu,
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            let promise = [];

            const {
              pengantin_pria,
              pengantin_wanita,
              story,
              lokasi_akad,
              jam_akad,
              tanggal_akad,
              lokasi_resepsi,
              jam_resepsi,
              tanggal_resepsi,
              keluarga_pria_ayah,
              keluarga_pria_ibu,
              keluarga_wanita_ayah,
              keluarga_wanita_ibu,
              add_gallery,
            } = values;

            const u_mempelai = api.post("/edit/mempelai", {
              pria: pengantin_pria,
              wanita: pengantin_wanita,
              story: story,
            });

            promise.push(u_mempelai);

            const u_akad = api.post("/edit/akad", {
              lokasi: lokasi_akad,
              jam: jam_akad,
              tanggal: tanggal_akad,
            });

            promise.push(u_akad);

            const u_resepsi = api.post("/edit/resepsi", {
              lokasi: lokasi_resepsi,
              jam: jam_resepsi,
              tanggal: tanggal_resepsi,
            });

            promise.push(u_resepsi);

            const u_kel_pria = api.post("/edit/keluarga-pria", {
              ayah: keluarga_pria_ayah,
              ibu: keluarga_pria_ibu,
            });

            promise.push(u_kel_pria);

            const u_kel_wanita = api.post("/edit/keluarga-wanita", {
              ayah: keluarga_wanita_ayah,
              ibu: keluarga_wanita_ibu,
            });

            promise.push(u_kel_wanita);

            add_gallery.map((d) => {
              const formdata = new FormData();
              formdata.append("file", d);
              formdata.file = formdata;
              const f = api.post("/edit/gallery", formdata, {
                headers: {
                  "content-type": "multipart/form-data",
                },
              });
              promise.push(f);
            });

            Promise.all(promise).then((r) => {
              if (add_gallery) {
                add_gallery.forEach((d) => {
                  this.setState((prevState) => ({
                    gallery: [
                      ...prevState.gallery,
                      {
                        url: URL.createObjectURL(d),
                      },
                    ],
                  }));
                });

                resetForm({ add_gallery: [] });
              }
            });
            /*  .then((res) => {
                const { status } = res.data;
                if (status === 200) {
                  this.setState((prevState) => ({
                    ucapan: [...prevState.ucapan, { user, ucapan }],
                  }));
                }
                setSubmitting(false);
              })
              .catch((err) => {
                setSubmitting(false);
              }); */
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
                  <div className={style.inputTitle}>
                    <div style={{ padding: "10px" }}> Pengantin pria</div>
                    <input
                      value={values.pengantin_pria}
                      onChange={handleChange}
                      name="pengantin_pria"
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        width: "30%",
                      }}
                      type="text"
                    />
                    <br></br>
                  </div>

                  <div className={style.inputTitle}>
                    <div style={{ padding: "10px" }}> Pengantin wanita</div>
                    <input
                      value={values.pengantin_wanita}
                      onChange={handleChange}
                      name="pengantin_wanita"
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        width: "30%",
                      }}
                      type="text"
                    />
                  </div>

                  <div className={style.inputTitle}>
                    <div style={{ padding: "10px" }}> Story</div>
                    <textarea
                      value={values.story}
                      onChange={handleChange}
                      name="story"
                      rows="4"
                      cols="50"
                      style={{ padding: "10px", borderRadius: "10px" }}
                      type="text"
                    ></textarea>
                  </div>

                  <div
                    style={{ fontSize: "20px" }}
                    className={style.inputTitle}
                  >
                    Akad
                  </div>
                  <div className={style.inputTitle}>
                    <div style={{ padding: "10px" }}> Lokasi</div>
                    <input
                      value={values.lokasi_akad}
                      onChange={handleChange}
                      name="lokasi_akad"
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        width: "30%",
                      }}
                      type="text"
                    />
                  </div>
                  <div className={style.inputTitle}>
                    <div style={{ padding: "10px" }}> Tanggal</div>
                    <input
                      value={values.tanggal_akad}
                      onChange={handleChange}
                      name="tanggal_akad"
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        width: "30%",
                      }}
                      type="date"
                    />
                  </div>
                  <div className={style.inputTitle}>
                    <div style={{ padding: "10px" }}> Jam</div>
                    <input
                      value={values.jam_akad}
                      onChange={handleChange}
                      name="jam_akad"
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        width: "30%",
                      }}
                      type="time"
                    />
                  </div>

                  <div
                    style={{ fontSize: "20px" }}
                    className={style.inputTitle}
                  >
                    Resepsi
                  </div>
                  <div className={style.inputTitle}>
                    <div style={{ padding: "10px" }}> Lokasi</div>
                    <input
                      value={values.lokasi_resepsi}
                      onChange={handleChange}
                      name="lokasi_resepsi"
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        width: "30%",
                      }}
                      type="text"
                    />
                  </div>
                  <div className={style.inputTitle}>
                    <div style={{ padding: "10px" }}> Tanggal</div>
                    <input
                      value={values.tanggal_resepsi}
                      onChange={handleChange}
                      name="tanggal_resepsi"
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        width: "30%",
                      }}
                      type="date"
                    />
                  </div>
                  <div className={style.inputTitle}>
                    <div style={{ padding: "10px" }}> Jam</div>
                    <input
                      value={values.jam_resepsi}
                      onChange={handleChange}
                      name="jam_resepsi"
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        width: "30%",
                      }}
                      type="time"
                    />
                  </div>

                  <div
                    style={{ fontSize: "20px" }}
                    className={style.inputTitle}
                  >
                    Keluarga Pria
                  </div>
                  <div className={style.inputTitle}>
                    <div style={{ padding: "10px" }}> Ayah</div>
                    <input
                      value={values.keluarga_pria_ayah}
                      onChange={handleChange}
                      name="keluarga_pria_ayah"
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        width: "30%",
                      }}
                      type="text"
                    />
                  </div>
                  <div className={style.inputTitle}>
                    <div style={{ padding: "10px" }}> Ibu</div>
                    <input
                      value={values.keluarga_pria_ibu}
                      onChange={handleChange}
                      name="keluarga_pria_ibu"
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        width: "30%",
                      }}
                      type="text"
                    />
                  </div>

                  <div
                    style={{ fontSize: "20px" }}
                    className={style.inputTitle}
                  >
                    Keluarga Wanita
                  </div>
                  <div className={style.inputTitle}>
                    <div style={{ padding: "10px" }}> Ayah</div>
                    <input
                      value={values.keluarga_wanita_ayah}
                      onChange={handleChange}
                      name="keluarga_wanita_ayah"
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        width: "30%",
                      }}
                      type="text"
                    />
                  </div>
                  <div className={style.inputTitle}>
                    <div style={{ padding: "10px" }}> Ibu</div>
                    <input
                      value={values.keluarga_wanita_ibu}
                      onChange={handleChange}
                      name="keluarga_wanita_ibu"
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        width: "30%",
                      }}
                      type="text"
                    />
                  </div>

                  <div
                    style={{ fontSize: "20px" }}
                    className={style.inputTitle}
                  >
                    Galery
                  </div>

                  <div>
                    {gallery.map((d, i) => {
                      return (
                        <Image
                          remove={() => {
                            api
                              .post("/delete/gallery", {
                                id: d.id,
                              })
                              .then((res) => {
                                const { status } = res.data;
                                if (status === 200) {
                                  let array = [...this.state.gallery];
                                  if (i !== -1) {
                                    array.splice(i, 1);
                                    this.setState({ gallery: array });
                                  }
                                }
                              })
                              .catch((err) => {});
                          }}
                          key={i}
                          src={
                            d && d.url.substr(0, 5) !== "blob:"
                              ? `http://localhost:5000/${d.url}`
                              : d.url
                          }
                        />
                      );
                    })}
                  </div>

                  <FieldArray
                    name="add_gallery"
                    render={(arrayHelpers) => (
                      <div>
                        {values.add_gallery.map((d, index) => (
                          <div key={index}>
                            <FileInput
                              remove={() => arrayHelpers.remove(index)}
                              name={`add_gallery.${index}`}
                              setFieldValue={setFieldValue}
                            />
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add new
                        </button>
                      </div>
                    )}
                  />

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
      </div>
    );
  }
}

export default App;
