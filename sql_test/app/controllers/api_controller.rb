class ApiController < ApiController
    def create
        json_data = JSON.parse(request.body.read)
        record = Sbom.new(name: json_data['name']) #Add the other components that are in an SBOM
        record.save

        render json: {message: 'Data saved :)'}
    end
end