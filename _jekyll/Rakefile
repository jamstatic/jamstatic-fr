# frozen_string_literal: true

require "jekyll"
require "bundler/setup"
Bundler.require(:jekyll_plugins, :test)

begin
  Bundler.setup
rescue Bundler::BundlerError => e
  $stderr.puts e.message
  $stderr.puts "Lancez `bundle install` pour installer les gems manquantes"
  exit e.status_code
end

task :default => "preview"

desc "Suppression des fichiers générés"
task :clean do
  puts "Suppression des fichiers générés…".bold
  Jekyll::Commands::Clean.process({})
end

desc "Génération du site"
task :build => :clean do
  puts "Génération du site…".bold
  Jekyll::Commands::Build.process({})
end

desc "Prévisualisation du site"
task :preview => :clean do
  puts "Prévisualisation du site…".bold
  options = {
    :profile     => true,
    :serving     => true,
    :watch       => true,
    :incremental => true,
    :livereload  => true,
  }
  Jekyll::Commands::Build.process(options)
  Jekyll::Commands::Serve.process(options)
end

desc "Vérification des fichiers HTML"
task :test => :build do
  HTMLProofer.check_directory("./_site", {
    :empty_alt_ignore => true,
    :disable_external => true,
    :check_html       => true,
    :parallel         => { :in_processes => 3 },
  }).run
end
