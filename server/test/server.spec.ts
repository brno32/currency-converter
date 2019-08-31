import express from "express";
import request from "supertest";
import { expect } from "chai";

describe("Server", () => {
  let app: express.Application;
  let server: import("http").Server;

  before(done => {
    app = express();
    app.get("/", (req, res) => {
      res.send("Welcome to Currency Converter");
    });
    app.use("/api/convert", require("../routes/convert"));
    app.use("/api/stats", require("../routes/stats"));
    server = app.listen(err => {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  after(done => {
    server.close();
    done();
  });

  it("should return valid response", done => {
    request(app)
      .get("/")
      .expect(200, (err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it("should return stats", done => {
    request(app)
      .get("/api/stats")
      .expect(200, (err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.totalAmountConverted).to.exist;
        expect(res.body.top_dest_currency).to.exist;
        expect(res.body.total_conversions).to.exist;
        done();
      });
  });

  it("should fail when no query params are present", done => {
    request(app)
      .get("/api/convert")
      .expect(400, (err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it("should fail when improperly formatted query params are present", done => {
    request(app)
      .get("/api/convert?amount=100&from=USD&to=AAA")
      .expect(400, (err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});
