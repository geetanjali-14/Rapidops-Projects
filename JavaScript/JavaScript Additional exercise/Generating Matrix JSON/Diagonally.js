        let nodes=[];
        let edges=[];
        let N=+prompt("Enter the number of rows: ")
        for (let i=0;i<N;i++)
        {
            for (let j=0;j<N;j++)
            {
                //Storing nodes
                let node_no="N"+String(i)+String(j);
                let data_node={'id':node_no}
                let data_obj={'data':data_node}
                nodes.push(data_obj)
                //Storing Edges
                    let source_node=[i]+[j]
                    let southEdges="N"+String(i+1)+"-"+String(j)
                    if(i+1<N && j<N)
                    {
                        
                        edges.push({'data':{'id':(i+1)+"-"+(j)+"S"," source":"N"+(i)+"-"+(j)," target":southEdges,}})
                    }
                    let northEdges="N"+String(i-1)+"-"+String(j)
                    if(i-1>=0 && j>=0)
                    {
                        edges.push({'data':{'id':(i-1)+"-"+(j)+"N"," source":"N"+(i)+"-"+(j)," target":northEdges}})
                    }
                    let westEdges="N"+String(i)+"-"+String(j-1)
                    if(i>=0 && j-1>=0)
                    {
                        edges.push({'data':{'id':(i)+"-"+(j-1)+"W"," source":"N"+(i)+"-"+(j)," target":westEdges}})
                    }
                    let eastEdges="N"+String(i)+"-"+String(j+1)
                    if(i<N && j+1<N)
                    {
                        edges.push({'data':{'id':(i)+"-"+(j+1)+"E"," source":"N"+(i)+"-"+(j)," target":eastEdges}})
                    }
                    let southEast="N"+String(i+1)+"-"+String(j+1)
                    if(i+1<N&& j+1<N)
                    {
                        edges.push({'data':{'id':"SE"+(i+1)+"-"+(j+1)," source":"N"+(i)+"-"+(j)," target":southEast}})
                    }
                    let southWest="N"+String(i+1)+"-"+String(j-1)
                    if(i+1<N&& j-1>=0)
                    {
                        edges.push({'data':{'id':"SW"+(i+1)+"-"+(j-1)," source":"N"+(i)+"-"+(j)," target":southWest}})
                    }
                    let northEast="N"+String(i-1)+"-"+String(j+1)
                    if(i-1>=0&& j+1<N)
                    {
                        edges.push({'data':{'id':"NE"+(i-1)+"-"+(j+1)," source":"N"+(i)+"-"+(j)," target":northEast}})
                    }
                    let northWest="N"+String(i-1)+"-"+String(j-1)
                    if(i-1>=0&& j-1>=0)
                    {
                        edges.push({'data':{'id':"NW"+(i-1)+"-"+(j-1)," source":"N"+(i)+"-"+(j)," target":northWest}})
                    }
                }
            }
            nodes=JSON.stringify(nodes)
            edges=JSON.stringify(edges)
            let object={"nodes":nodes,
                        "edges":edges}
        console.log(object)        