import * as React from "react";

export default class CalanderView extends React.Component {
  public render() {
    return (
      <div className="container">
        <div className="row headers">
          <div className="col">Monday</div>
          <div className="col">Tuesday</div>
          <div className="col">Wednesday</div>
          <div className="col">Thursday</div>
          <div className="col">Friday</div>
          <div className="col">Saturday</div>
          <div className="col">Sunday</div>
        </div>

        <div className="row days">
          <div className="col lastmonth">28</div>
          <div className="col lastmonth">29</div>
          <div className="col lastmonth">30</div>
          <div className="col lastmonth">31</div>
          <div className="col">1</div>
          <div className="col">2</div>
          <div className="col">3</div>
        </div>

        <div className="row days">
          <div className="col">4</div>
          <div className="col">5</div>
          <div className="col">6</div>
          <div className="col">7</div>
          <div className="col">8</div>
          <div className="col">9</div>
          <div className="col">10</div>
        </div>

        <div className="row days">
          <div className="col">11</div>
          <div className="col">12</div>
          <div className="col">13</div>
          <div className="col">14</div>
          <div className="col">15</div>
          <div className="col">16</div>
          <div className="col">17</div>
        </div>

        <div className="row days">
          <div className="col">18</div>
          <div className="col">19</div>
          <div className="col">20</div>
          <div className="col">21</div>
          <div className="col">22</div>
          <div className="col">23</div>
          <div className="col">24</div>
        </div>

        <div className="row days">
          <div className="col">25</div>
          <div className="col">26</div>
          <div className="col">27</div>
          <div className="col">28</div>
          <div className="col">29</div>
          <div className="col">30</div>
          <div className="col nextmonth">01</div>
        </div>

        <div className="row days">
          <div className="col nextmonth">02</div>
          <div className="col nextmonth">03</div>
          <div className="col nextmonth">04</div>
          <div className="col nextmonth">05</div>
          <div className="col nextmonth">06</div>
          <div className="col nextmonth">07</div>
          <div className="col nextmonth">08</div>
        </div>
      </div>
    );
  }
}