import React from 'react'

const Sites = ({sites}) => {
    return (
        <div align='center'>
            <h1>Sites</h1>

            {sites.map((site) => (
                <div className='card'>
                    <div className='card-body'>
                        <h5 className='card-title'>{site.id}</h5>
                        <h6 className='card-subtitle mb-2 text-muted'>{site.name}</h6>
                        <p className='card-text'>{site.id}-{site.name}</p>
                    </div>
                </div>
            ))}

        </div>
    )
};

export default Sites