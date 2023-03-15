
        let nodes=[];
        let edges=[];
        let N=+prompt("Enter the number of rows: ")
        for (let i=0;i<N;i++)
        {
            for (let j=0;j<N;j++)
            {
                //Storing nodes
                let node_no="N"+String(i)+"-"+String(j);
                // console.log(node_no);
                let data_node={'id':node_no}
                let data_obj={'data':data_node}
                nodes.push(data_obj)
                

                //Storing Edges
                    let source_node=[i]+[j]
                    let southEdges="N"+String(i+1)+"-"+String(j)
                    if(i+1<N && j<N)
                    {
                        
                        edges.push({'data':{'id':(i+1)+"-"+(j)+"S"," source":"N"+(i)+"-"+(j)," target":southEdges,}})
                        //console.log(source_node+"S")
                    }
                    let northEdges="N"+String(i-1)+"-"+String(j)
                    if(i-1>=0 && j>=0)
                    {
                        edges.push({'data':{'id':(i-1)+"-"+(j)+"N"," source":"N"+(i)+"-"+(j)," target":northEdges}})
                        //console.log(source_node+"N")
                    }
                    let westEdges="N"+String(i)+"-"+String(j-1)
                    if(i>=0 && j-1>=0)
                    {
                        edges.push({'data':{'id':(i)+"-"+(j-1)+"W"," source":"N"+(i)+"-"+(j)," target":westEdges}})
                        //console.log(source_node+"W")
                    }
                    let eastEdges="N"+String(i)+"-"+String(j+1)
                    if(i<N && j+1<N)
                    {
                        edges.push({'data':{'id':(i)+"-"+(j+1)+"E"," source":"N"+(i)+"-"+(j)," target":eastEdges}})
                        //console.log(source_node+"E")
                    }
                }
        }
        nodes=JSON.stringify(nodes)
        edges=JSON.stringify(edges)
        let object={"nodes":nodes,
                "edges":edges}
        console.log(object)        
    