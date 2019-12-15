import React from "react";


export default class QuickTable extends React.Component<any, any>{


    render() {
        const { headers, data } = this.props
        if (!Array.isArray(headers) || !Array.isArray(data)) return <h2> </h2>
        return (
            <div>
                <table className="table table-striped table-dark" style={{ fontSize: "0.7rem" }}>
                    <thead>
                        {headers}
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
            </div>
        )
    }
}