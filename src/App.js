import React from 'react';

function App() {
    return (
        <div className='wrapper clear'>
            <header className="d-flex justify-between align-center p-40">
                <div className="d-flex align-center">
                    <img width={40} height={40} src=""/>
                    <div>
                        <h3 className="text-uppercase">React Sneakers</h3>
                        <p>Магазин кроссовок</p>
                    </div>
                </div>
                <div className="d-flex">
                    <ul>
                        <li className="mr-30">
                            <img width={18} height={18} src="" alt=""/>
                            <span>Price</span></li>
                        <li>
                            <img width={18} height={18} src="" alt=""/>
                        </li>
                    </ul>
                </div>
            </header>
            <div className="content p-40">
                <h1 className="mb-40">All sneakers</h1>
                <div className="sneakers d-flex">
                    <div className="card">
                        <img width={133} height={112} src="" alt=""/>
                        <h5>
                            Женские кроссовки Nike Outfit
                        </h5>
                        <div className="d-flex justify-between align-center">
                            <div className="d-flex flex-column">
                                <span>Price: </span>
                                <b>12999P</b>
                            </div>
                            <button className="button">
                                <img width={11} height={11} src="" alt=""/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
