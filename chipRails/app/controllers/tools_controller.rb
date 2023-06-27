class ToolsController < ApplicationController
    def new
        @tool = Tool.new
    end
    
    def index
        @tools = Tool.all
        render json: @tools, status: :ok
    end
    
    def create
        @metadatum = Metadatum.find(params[:metadatum_id])
        @tool = @metadatum.tool.new(tool_params)
    end

    def tool_params
        params.require(:tool).permit(:vendor, :name, :version)
    end
end