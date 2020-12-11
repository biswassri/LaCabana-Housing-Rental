import React, { Component } from "react";
import { Form } from "react-bootstrap";

class Search extends Component {
  state = {};
  render() {
    return (
      <section className="search-bar">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <form>
                <div>
                  <div class="input-group">
                    <input
                      type="search"
                      class="form-control"
                      placeholder="Enter an address, zip code or city"
                      aria-label="Enter an address, zip code or city"
                      aria-describedby="basic-addon2"
                    />
                    <div class="input-group-append">
                      <button class="btn btn-secondary" type="button">
                        Room
                      </button>
                      <button class="btn btn-secondary" type="button">
                        Tenant
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Search;
