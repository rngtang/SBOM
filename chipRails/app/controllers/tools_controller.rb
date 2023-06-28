class ToolsController < ApplicationController
    def new
        @tool = Tool.new
    end
    
    def index
        @metadatum = Metadatum.find(params[:metadatum_id])
        render json: @metadatum.tools, status: :ok
    end
    
    def create
        @metadatum = Metadatum.find(params[:metadatum_id])
        @tool = @metadatum.tool.new(tool_params)
    end

    def tool_params
        params.require(:tool).permit(:vendor, :name, :version)
    end
end